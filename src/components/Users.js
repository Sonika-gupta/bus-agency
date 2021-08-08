import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { userApi as api } from '../api'
import { Header, List, FormDialog } from './CommonComponents'
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

export default function Users ({
  setNotif,
  dialog,
  openAddDialog,
  openEditDialog,
  handleClose
}) {
  const [users, setUsers] = useState([])

  async function handleDelete (e, user) {
    try {
      const consent = window.confirm(`Delete User ${user.username}?`)
      if (consent) {
        const deletedUser = await api.deleteUser(user)
        const i = user.findIndex(obj => obj.id === deletedUser.id)
        setUsers([...users.splice(i, 1)])
        setNotif({
          type: 'success',
          message: `${user.type} ${user.username} Deleted!`
        })
      }
    } catch (error) {
      setNotif({ error })
    }
  }

  function onSuccess (result) {
    if (dialog.action === 'edit') {
      users[users.findIndex(user => user.id === result.id)] = result
      setUsers([...users])
    } else setUsers([...users, result])
    setNotif({
      type: 'success',
      message:
        `${result.type} ${result.username} ` +
        (dialog.action === 'edit' ? 'Updated!' : 'Added!')
    })
    handleClose()
  }

  useEffect(() => {
    ;(async () => {
      setUsers(await api.getUsers())
    })()
  }, [])

  return (
    <>
      <Header heading='users' onClick={openAddDialog} />
      <List
        rows={users}
        columns={columns}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />
      <FormDialog
        open={dialog.open}
        onClose={handleClose}
        title={`${dialog.action.toUpperCase()} USER`}
        form={
          <UserForm
            editUser={dialog.object}
            onSuccess={onSuccess}
            onFailure={error => setNotif({ error })}
          />
        }
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
