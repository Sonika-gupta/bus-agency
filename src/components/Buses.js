import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles
} from '@material-ui/core'
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

  function handleOnEdit (e, bus) {
    setAction('edit')
    setBus(bus)
    setOpen(true)
  }

  async function editBus (bus) {
    try {
      const updatedBus = await api.updateBus(bus)
      setBuses(buses.map(bus => (bus.id === updatedBus.id ? updatedBus : bus)))

      handleClose()
      window.alert(`Bus ${updatedBus.bus_name} Updated!`)
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function newBus (bus) {
    try {
      const addedBus = await api.addBus(bus)
      setBuses([...buses, addedBus])
      window.alert(`Bus ${addedBus.bus_name} Added! `)
      handleClose()
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function handleDelete (e, bus) {
    try {
      const consent = window.confirm(`Delete Bus ${bus.bus_name}`)
      if (consent) {
        const deletedBus = await api.deleteBus(bus)
        setBuses(buses.filter(bus => bus.id !== deletedBus.id))
        window.alert(`Bus ${deletedBus.bus_name} Deleted!`)
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
      <List
        rows={buses}
        columns={columns}
        onEdit={handleOnEdit}
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
