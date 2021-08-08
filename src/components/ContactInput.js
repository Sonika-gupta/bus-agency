import { TextField } from '@material-ui/core'

function MobileInput ({ value }) {
  return (
    <TextField
      value={value}
      name='contact'
      label='Contact Number'
      inputProps={{
        pattern: '[0-9]{10}',
        title: '10-digit phone number'
      }}
      required
      fullWidth
    />
  )
}

function LandlineInput ({ value }) {
  return (
    <TextField
      value={value}
      name='contact'
      label='Landline Number'
      inputProps={{
        pattern: '[0-9]{11}',
        title: 'ex: 011 9999 9999'
      }}
      required
      fullWidth
    />
  )
}

export { MobileInput, LandlineInput }
