import { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles
} from '@material-ui/core'
import { busApi as api } from '../api'
import Header from './Header'
import List from './List'
import BusForm from './BusForm'

const useStyles = makeStyles(theme => ({
  form: {
    backgroundColor: theme.palette.background.default
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
  { key: 'busNumber', title: '#' },
  { key: 'busName', title: 'Name' },
  { key: 'source', title: 'Source' },
  { key: 'destination', title: 'Destination' },
  { key: 'departTime', title: 'Departure' },
  { key: 'arrivalTime', title: 'Arrival' },
  { key: 'chart', title: 'Seater' },
  // { key: 'runningDays', title: 'Days' },
  // { key: 'amenities', title: 'Amenities' },
  {
    key: 'seatFare',
    title: 'Seat',
    valueGetter: value => `₹ ${value}`,
    align: 'right'
  },
  {
    key: 'sleeperFare',
    title: 'Sleeper',
    align: 'right',
    valueGetter: value => `₹ ${value}`
  },
  {
    key: 'agentSeatFare',
    title: 'Agent Seat',
    align: 'right',
    valueGetter: value => `₹ ${value}`
  },
  {
    key: 'agentSleeperFare',
    title: 'Agent Sleeper',
    align: 'right',
    valueGetter: value => `₹ ${value}`
  }
]
// TODO: Replace window.alert with Notification

export default function Buses () {
  const [buses, setBuses] = useState([])
  const [bus, setBus] = useState({})
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('add')
  const classes = useStyles()

  function handleSubmit (e, bus) {
    e.preventDefault()
    bus.id ? editBus(bus) : newBus(bus)
  }

  function handleClose () {
    setOpen(false)
    setBus({})
  }

  function handleEdit (e, bus) {
    setAction('edit')
    setBus(bus)
    setOpen(true)
  }

  function onAdd () {
    setOpen(true)
    setAction('add')
  }

  async function editBus (bus) {
    try {
      const updatedBus = await api.updateBus(bus)
      setBuses(buses.map(bus => (bus.id === updatedBus.id ? updatedBus : bus)))

      handleClose()
      window.alert(`Bus ${updatedBus.busName} Updated!`)
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function newBus (bus) {
    try {
      const addedBus = await api.addBus(bus)
      setBuses([...buses, addedBus])
      window.alert(`Bus ${addedBus.busName} Added! `)
      handleClose()
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function handleDelete (e, bus) {
    try {
      const consent = window.confirm(`Delete Bus ${bus.busName}?`)
      if (consent) {
        const deletedBus = await api.deleteBus(bus)
        setBuses(buses.filter(bus => bus.id !== deletedBus.id))
        window.alert(`Bus ${deletedBus.busName} Deleted!`)
      }
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  useEffect(() => {
    ;(async () => {
      setBuses(await api.getBuses())
    })()
    return () => setBuses([])
  }, [])

  return (
    <>
      <Header heading='buses/' action={{ title: 'ADD BUS', onClick: onAdd }} />
      <List
        rows={buses}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
        classes={{ paper: classes.form }}
      >
        <DialogTitle>{action.toUpperCase()} BUS</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <BusForm editBus={bus} handleSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant='contained' onClick={handleClose}>
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
