import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { userApi as api } from '../api'
import Header from './Header'
import List from './List'
import CustomDialog from './CustomDialog'
import UserForm from './UserForm'

const columns = [
  { key: 'type', title: 'Type', style: { textTransform: 'capitalize' } },
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

const initDialog = {
  open: false,
  user: {},
  action: 'add'
}

export default function Users ({ setNotif }) {
  const [users, setUsers] = useState([])
  const [dialog, setDialog] = useState(initDialog)

  async function editUser (user) {
    const updatedUser = await api.updateUser(user)
    users[users.findIndex(user => user.id === updatedUser.id)] = user
    setUsers([...users])
    return updatedUser
  }

  async function newUser (user) {
    const addedUser = await api.addUser(user)
    setUsers([...users, addedUser])
    return addedUser
  }

  async function handleDelete (e, user) {
    try {
      const consent = window.confirm(`Delete User ${user.username}?`)
      if (consent) {
        const deletedUser = await api.deleteUser(user)
        const i = user.findIndex(obj => obj.id === deletedUser.id)
        setUsers([...users.splice(i, 1)])
        setNotif({
          type: 'success',
          message: deletedUser.type + deletedUser.username + 'Deleted!'
        })
      }
    } catch (error) {
      setNotif({ error })
    }
  }

  async function handleSubmit (e, user) {
    e.preventDefault()
    try {
      const result = user.id ? await editUser(user) : await newUser(user)
      setNotif({
        type: 'success',
        message:
          result.type + result.username + dialog.action === 'edit'
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

  function onClickEdit (e, user) {
    setDialog({ open: true, action: 'edit', user })
  }

  function onClickAdd () {
    setDialog({ open: true, action: 'add' })
  }

  useEffect(() => {
    ;(async () => {
      setUsers(await api.getUsers())
    })()
  }, [])

  return (
    <>
      <Header heading='users' onClick={onClickAdd} />
      <List
        rows={users}
        columns={columns}
        onEdit={onClickEdit}
        onDelete={handleDelete}
      />
      <CustomDialog
        open={dialog.open}
        onClose={handleClose}
        title={`${dialog.action.toUpperCase()} USER`}
        form={<UserForm editUser={dialog.user} handleSubmit={handleSubmit} />}
        actions={
          dialog.action === 'add' ? (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              form='userForm'
            >
              Sign Up
            </Button>
          ) : (
            <>
              <Button variant='contained' onClick={handleClose}>
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
            </>
          )
        }
      />
    </>
  )
}
