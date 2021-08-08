import { Switch, Route } from 'react-router-dom'
import { useState, useReducer, useEffect } from 'react'
import Buses from './Buses'
import Users from './Users'
import Operators from './Operators.js'
import { Notify } from './CommonComponents'

const notify = (value, { close, error, type, message }) =>
  close
    ? { close: true }
    : error
    ? { close: false, type: 'error', message: error }
    : { close: false, type, message }

const initNotif = {
  close: true,
  message: undefined,
  type: 'info',
  error: undefined
}

const initDialog = {
  open: false,
  action: 'add',
  objec: {}
}

export default function Content () {
  const [notif, setNotif] = useReducer(notify, initNotif)
  const [dialog, setDialog] = useState(initDialog)

  function openAddDialog () {
    setDialog({ open: true, action: 'add', object: {} })
  }
  function openEditDialog (e, object) {
    setDialog({ open: true, action: 'edit', object })
  }
  function handleCloseDialog () {
    setDialog(initDialog)
  }

  useEffect(() => {
    console.log(notif)
  }, [notif])
  return (
    <>
      <Notify
        open={!notif.close}
        message={notif.message}
        type={notif.type}
        handleClose={() => setNotif({ close: true })}
      />
      <Switch>
        <Route path='/buses'>
          <Buses
            dialog={dialog}
            openEditDialog={openEditDialog}
            openAddDialog={openAddDialog}
            setNotif={setNotif}
            handleClose={handleCloseDialog}
          />
        </Route>
        <Route path='/users'>
          <Users
            dialog={dialog}
            openEditDialog={openEditDialog}
            openAddDialog={openAddDialog}
            setNotif={setNotif}
            handleClose={handleCloseDialog}
          />
        </Route>
        <Route path='/bookings'></Route>
        <Route path='/operators'>
          <Operators />
        </Route>
        <Route path='/settings'></Route>
        <Route path='/'></Route>
      </Switch>
    </>
  )
}
