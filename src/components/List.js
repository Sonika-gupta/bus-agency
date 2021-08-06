import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody
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
  tableRow: {
    background: theme.palette.common.white
  }
}))

export default function List ({ rows, columns, onEdit, onDelete }) {
  const classes = useStyles()
  return (
    <TableContainer style={{ width: '100%', margin: 'auto' }}>
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
            <TableRow key={row.id} className={classes.tableRow}>
              <TableCell>
                <IconButton
                  aria-label='edit row'
                  size='small'
                  onClick={e => onEdit(e, row)}
                >
                  <EditIcon fontSize='small' color='action' />
                </IconButton>
              </TableCell>
              {columns.map(column => (
                <TableCell
                  align={column.align}
                  key={column.key}
                  style={column.style}
                >
                  {column.render
                    ? column.render(row)
                    : column.valueGetter
                    ? column.valueGetter(row[column.key])
                    : row[column.key]}
                </TableCell>
              ))}
              <TableCell>
                <IconButton
                  aria-label='edit row'
                  size='small'
                  onClick={e => onDelete(e, row)}
                >
                  <DeleteIcon fontSize='small' color='error' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
