import { TextField, InputAdornment } from '@material-ui/core'
export default function PriceInput ({ label, name, value, onChange }) {
  return (
    <TextField
      required
      type='number'
      onChange={onChange}
      label={label}
      name={name}
      value={value}
      InputProps={{
        startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
        endAdornment: <InputAdornment position='end'>/-</InputAdornment>
      }}
      fullWidth
    />
  )
}
