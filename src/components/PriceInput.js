import { TextField, InputAdornment } from '@material-ui/core'
export default function PriceInput ({ label, name, value, onChange }) {
  return (
    <TextField
      type='number'
      onChange={onChange}
      label={label}
      name={name}
      value={value}
      InputProps={{
        startAdornment: <InputAdornment position='start'>₹</InputAdornment>
      }}
      fullWidth
    />
  )
}
