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
import List from './List'
// import UserForm from './UserForm'
// import { userApi as api } from '../api'

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
  { key: 'username', title: 'Name' },
  { key: 'type', title: 'Type' },
  { key: 'email', title: 'Email' },
  { key: 'bookings', title: 'Total Bookings' }
]

export default function Users () {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(true)
  const [action, setAction] = useState('add')
  const classes = useStyles()

  /* async function handleSubmit (e, user) {
    e.preventDefault()
    try {
      const newUser = await api.addUser(user)
      setUsers([...users, newUser])
      window.alert(`Bus Added with id ${newUser.id}`)
      setOpen(false)
      console.log(e.target, newUser)
    } catch (err) {
      console.log(JSON.stringify(err))
      window.alert(JSON.stringify(err).message)
    }
  }
  console.log(users)
  useEffect(() => {
    ;(async () => {
      setUsers(await api.getUsers())
    })()
    return () => setUsers([])
  }, [])
 */
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
          Add User
        </Button>
      </Box>
      <List rows={users} columns={columns} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='md'
        classes={{ paper: classes.form }}
      >
        <DialogTitle>{action.toUpperCase()} USER</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {/* <UserForm handleSubmit={handleSubmit} /> */}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant='contained' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            form='userForm'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
