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

const columns = [
  { key: 'bus_number', title: '#' },
  { key: 'bus_name', title: 'Name' },
  { key: 'source', title: 'Source' },
  { key: 'destination', title: 'Destination' },
  { key: 'depart_time', title: 'Departure' },
  { key: 'arrival_time', title: 'Arrival' },
  { key: 'chart', title: 'Seater' },
  // { key: 'running_days', title: 'Days' },
  // { key: 'amenities', title: 'Amenities' },
  {
    key: 'seat_fare',
    title: 'Seat',
    valueGetter: value => `₹ ${value}`,
    align: 'right'
  },
  {
    key: 'sleeper_fare',
    title: 'Sleeper',
    align: 'right',
    valueGetter: value => `₹ ${value}`
  },
  {
    key: 'agent_seat_fare',
    title: 'Agent Seat',
    align: 'right',
    valueGetter: value => `₹ ${value}`
  },
  {
    key: 'agent_sleeper_fare',
    title: 'Agent Sleeper',
    align: 'right',
    valueGetter: value => `₹ ${value}`
  }
]

export default function BusList ({ buses }) {
  console.log(buses)
  const classes = useStyles()
  return (
    // <BusCard key={bus.bus_number} bus={bus}></BusCard>
    <TableContainer component={Paper} style={{ width: '100%', margin: 'auto' }}>
      <Table className={classes.table} aria-label='list of buses'>
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
          {buses.map(bus => (
            <TableRow key={bus.bus_number}>
              {columns.map(column => (
                <TableCell
                  className={classes.tableCell}
                  align={column.align}
                  key={column.key}
                >
                  {column.valueGetter
                    ? column.valueGetter(bus[column.key])
                    : bus[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

/* import { DataGrid } from '@material-ui/data-grid'
import { Paper } from '@material-ui/core'
const columns = [
  { field: 'bus_number', headerName: '#' },
  { field: 'bus_name', headerName: 'Name' },
  { field: 'source', headerName: 'Source' },
  { field: 'destination', headerName: 'Destination' },
  { field: 'depart_time', headerName: 'Departure' },
  { field: 'arrival_time', headerName: 'Arrival' },
  { field: 'chart', headerName: 'Seater' },
  // { field: 'running_days', headerName: 'Days' },
  // { field: 'amenities', headerName: 'Amenities' },
  { field: 'seat_fare', headerName: 'Seat' },
  { field: 'sleeper_fare', headerName: 'Sleeper' },
  { field: 'agent_seat_fare', headerName: 'Agent Seat' },
  { field: 'agent_sleeper_fare', headerName: 'Agent Sleeper' }
]

export default function BusList ({ buses }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={buses}
        columns={columns}
        pageSize={10}
        components={Paper}
      />
    </div>
  )
} */
