import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { busApi as api } from '../api'
import Header from './Header'
import List from './List'
import CustomDialog from './CustomDialog'
import BusForm from './BusForm'

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

const initDialog = {
  open: false,
  bus: {},
  action: 'add'
}

export default function Buses ({ setNotif }) {
  const [buses, setBuses] = useState([])
  const [dialog, setDialog] = useState(initDialog)

  async function editBus (bus) {
    const updatedBus = await api.updateBus(bus)
    buses[buses.findIndex(bus => bus.id === updatedBus.id)] = bus
    setBuses([...buses])
    return updatedBus
  }

  async function newBus (bus) {
    const addedBus = await api.addBus(bus)
    setBuses([...buses, addedBus])
    return addedBus
  }

  async function handleDelete (e, bus) {
    try {
      const consent = window.confirm(`Delete Bus ${bus.busName}?`)
      if (consent) {
        const deletedBus = await api.deleteBus(bus)
        const i = buses.findIndex(obj => obj.id === deletedBus.id)
        setBuses([...buses.splice(i, 1)])
        setNotif({
          type: 'success',
          message: `Bus ${deletedBus.busName} Deleted!`
        })
      }
    } catch (error) {
      setNotif({ error })
    }
  }

  async function handleSubmit (e, bus) {
    e.preventDefault()
    try {
      const result = bus.id ? await editBus(bus) : await newBus(bus)
      setNotif({
        type: 'success',
        message:
          `Bus ${result.busName}` + dialog.action === 'edit'
            ? 'Updated!'
            : 'Added!'
      })
      handleClose()
    } catch (error) {
      setNotif({ error })
    }
  }

  function handleClose () {
    setDialog(initDialog)
  }

  function onClickEdit (e, bus) {
    setDialog({ open: true, action: 'edit', bus })
  }

  function onClickAdd () {
    setDialog({ open: true, action: 'add' })
  }

  useEffect(() => {
    ;(async () => {
      setBuses(await api.getBuses())
    })()
    return () => setBuses([])
  }, [])

  return (
    <>
      <Header heading='buses' onClick={onClickAdd} />
      <List
        rows={buses}
        columns={columns}
        onEdit={onClickEdit}
        onDelete={handleDelete}
      />
      <CustomDialog
        open={dialog.open}
        onClose={handleClose}
        maxWidth='md'
        title={`${dialog.action} bus`}
        form={<BusForm editBus={dialog.bus} handleSubmit={handleSubmit} />}
        actions={
          <>
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
          </>
        }
      />
    </>
  )
}
