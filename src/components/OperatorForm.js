import { useReducer } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { initOperator } from '../values'
import { MobileInput, LandlineInput } from './CommonComponents'

export default function OperatorForm ({ editProvider, handleSubmit }) {
  const [operator, setProvider] = useReducer(
    (operator, newValue) => ({ ...operator, ...newValue }),
    editProvider || initOperator
  )

  function handleChange (e) {
    console.log(e.target.name, e.target.value)
    setProvider({ [e.target.name]: e.target.value })
  }

  return (
    <form
      id='operatorForm'
      onSubmit={e => handleSubmit(e, operator)}
      onChange={handleChange}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id='name'
            name='name'
            label='Service Provider Name'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='vatNo'
            name='vatNo'
            label='VAT No.'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='address1'
            name='address1'
            label='Address line 1'
            fullWidth
            autoComplete='shipping address-line1'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address2'
            name='address2'
            label='Address line 2'
            fullWidth
            autoComplete='shipping address-line2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='City'
            fullWidth
            autoComplete='shipping address-level2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id='state' name='state' label='State' fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='zip'
            name='zip'
            label='Zip / Postal code'
            fullWidth
            autoComplete='shipping postal-code'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MobileInput value={operator.contact} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LandlineInput value={operator.landline} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='designation'
            name='designation'
            label='Designation of Contact Person'
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  )
}
