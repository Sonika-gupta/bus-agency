import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  actionPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  tableContainer: {
    margin: 5
  },
  table: {
    minWidth: 650
  },
  tableCell: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  }
}))

export default function List ({ rows, columns, onEdit, onDelete }) {
  const classes = useStyles()
  return (
    <TableContainer component={Paper} style={{ width: '100%', margin: 'auto' }}>
      <Table className={classes.table} aria-label='rows'>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map(column => (
              <TableCell key={column.key} align={column.align}>
                {column.title}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.tableCell}>
                <IconButton
                  aria-label='edit row'
                  size='small'
                  onClick={e => onEdit(e, row)}
                  color='inherit'
                  style={{ opacity: 0.8 }}
                >
                  <EditIcon fontSize='small' />
                </IconButton>
              </TableCell>
              {columns.map(column => (
                <TableCell
                  className={classes.tableCell}
                  align={column.align}
                  key={column.key}
                >
                  {column.render
                    ? column.render(row)
                    : column.valueGetter
                    ? column.valueGetter(row[column.key])
                    : row[column.key]}
                </TableCell>
              ))}
              <TableCell className={classes.tableCell}>
                <IconButton
                  aria-label='edit row'
                  size='small'
                  onClick={e => onDelete(e, row)}
                  color='inherit'
                  style={{ opacity: 0.8 }}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
