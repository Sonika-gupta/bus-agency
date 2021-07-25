import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@material-ui/core'

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

export default function List ({ rows, columns }) {
  console.log(rows)
  const classes = useStyles()
  return (
    // <BusCard key={bus.bus_number} bus={bus}></BusCard>
    <TableContainer component={Paper} style={{ width: '100%', margin: 'auto' }}>
      <Table className={classes.table} aria-label='rows'>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.key} align={column.align}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {columns.map(column => (
                <TableCell
                  className={classes.tableCell}
                  align={column.align}
                  key={column.key}
                >
                  {column.valueGetter
                    ? column.valueGetter(row[column.key])
                    : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
