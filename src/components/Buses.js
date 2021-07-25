import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { busApi as api } from '../api'
import List from './List'
import BusForm from './BusForm'

const useStyles = makeStyles(theme => ({
  actionPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
  },
  form: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main
  },
  dialogContent: {
    overflow: 'visible'
  },
  dialogActions: {
    margin: 20,
    justifyContent: 'space-between'
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

export default function Buses () {
  const [buses, setBuses] = useState([])
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('add')
  const classes = useStyles()

  async function handleSubmit (e, bus) {
    e.preventDefault()
    try {
      const newBus = await api.addBus(bus)
      setBuses([...buses, newBus])
      window.alert(`Bus Added with id ${newBus.id}`)
      setOpen(false)
      console.log(e.target, newBus)
    } catch (err) {
      console.log(JSON.stringify(err))
      window.alert(JSON.stringify(err).message)
    }
  }
  console.log(buses)
  useEffect(() => {
    ;(async () => {
      setBuses(await api.getBuses())
    })()
    return () => setBuses([])
  }, [])

  return (
    <>
      <Box className={classes.actionPanel}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => {
            setOpen(true)
            setAction('add')
          }}
        >
          Add Bus
        </Button>
      </Box>
      <List rows={buses} columns={columns} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='md'
        classes={{ paper: classes.form }}
      >
        <DialogTitle>{action.toUpperCase()} BUS</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <BusForm handleSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant='contained' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            form='busForm'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
