import { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles
} from '@material-ui/core'
import Header from './Header'
import List from './List'
import UserForm from './UserForm'
import { userApi as api } from '../api'

const useStyles = makeStyles(theme => ({
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
  { key: 'type', title: 'Type' },
  { key: 'username', title: 'User Name' },
  {
    key: 'name',
    title: 'Full Name',
    render: user => `${user.fname} ${user.lname}`,
    style: { textTransform: 'capitalize' }
  },
  { key: 'email', title: 'Email' },
  {
    key: 'isActive',
    title: 'Status',
    render: user =>
      user.isActive ? 'Active' : `Last Active on ${user.lastActive}`
  }
]

export default function Users () {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('add')
  const classes = useStyles()

  function handleSubmit (e, user) {
    e.preventDefault()
    user.id ? editUser(user) : newUser(user)
  }

  function handleClose () {
    setOpen(false)
    setUser({})
  }

  function handleEdit (e, user) {
    setAction('edit')
    setUser(user)
    setOpen(true)
  }

  function onAdd () {
    setOpen(true)
    setAction('add')
  }

  async function editUser (user) {
    try {
      const updatedUser = await api.updateUser(user)
      setUsers(
        users.map(user => (user.id === updatedUser.id ? updatedUser : user))
      )

      handleClose()
      window.alert(`User ${updatedUser.username} Updated!`)
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function newUser (user) {
    try {
      const addedUser = await api.addUser(user)
      setUsers([...users, addedUser])
      window.alert(`User ${addedUser.username} Added! `)
      handleClose()
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function handleDelete (e, user) {
    try {
      const consent = window.confirm(`Delete User ${user.username}?`)
      if (consent) {
        const deletedUser = await api.deleteUser(user)
        setUsers(users.filter(user => user.id !== deletedUser.id))
        window.alert(`User ${deletedUser.username} Deleted!`)
      }
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  console.log(users)
  useEffect(() => {
    ;(async () => {
      setUsers(await api.getUsers())
    })()
  }, [])

  function onAdd () {
    setOpen(true)
    setAction('add')
  }
  return (
    <>
      <Header heading='users/' action={{ title: 'ADD USER', onClick: onAdd }} />
      <List
        rows={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        classes={{ paper: classes.form }}
      >
        <DialogTitle>{action.toUpperCase()} USER</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <UserForm handleSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
            form='userForm'
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
