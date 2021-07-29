import { useReducer } from 'react'
import { Grid, MenuItem, TextField } from '@material-ui/core'
import { initUser, userType } from '../values'

export default function UserForm ({ editUser, handleSubmit }) {
  const [user, setUser] = useReducer(
    (user, newValue) => ({ ...user, ...newValue }),
    editUser?.id ? editUser : initUser
  )

  console.log('User', user)
  function handleChange (e) {
    console.log(e.target.name, e.target.value)
    setUser({ [e.target.name]: e.target.value })
  }

  return (
    <form
      id='UserForm'
      onSubmit={e => handleSubmit(e, user)}
      onChange={handleChange}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            name='type'
            label='User Type'
            value={user.type}
            onChange={handleChange}
            required
            fullWidth
            style={{ textTransform: 'capitalize' }}
          >
            {userType.map((type, i) => (
              <MenuItem
                value={type}
                key={i}
                style={{ textTransform: 'capitalize' }}
              >
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={user.fname}
            name='firstName'
            label='First Name'
            required
            fullWidth
            autoFocus
            autoComplete='fname'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={user.lname}
            name='lastName'
            label='Last Name'
            required
            fullWidth
            autoComplete='lname'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={user.username}
            name='username'
            label='Userame'
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={user.password}
            name='password'
            label='Password'
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={user.contact}
            name='username'
            label='Contact Number'
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={user.email}
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
        </Grid>
      </Grid>
    </form>
  )
}
