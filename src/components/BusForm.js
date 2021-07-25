import { useReducer, useState, useEffect } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  makeStyles
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { initBus, days, amenities } from '../values'

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'row'
  },
  outlined: {
    transform: 'scale(0.8)'
  },
  label: {
    textTransform: 'capitalize'
  },
  labelBold: {
    fontWeight: 'bold'
  },
  button: {
    // TODO: find a way to remove !important / increase specificity
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.common.white} !important`
  },
  checkAll: { width: '100%' }
}))

export default function BusForm ({ handleSubmit }) {
  const classes = useStyles()

  const [allDays, setAllDays] = useState(false)
  const [allAmenities, setAllAmenities] = useState(false)
  const [bus, setBus] = useReducer(
    (bus, newValue) => ({ ...bus, ...newValue }),
    initBus
  )

  function handleChange (e) {
    console.log(e.target.name, e.target.value)
    setBus({ [e.target.name]: e.target.value })
  }

  function handleToggleChange (e, newValues) {
    console.log(e.target.value, newValues)
    if (e.target.name === 'amenities') {
      setBus({
        amenities: newValues
          ? [...bus.amenities, e.target.value]
          : bus.amenities.filter(item => item !== e.target.value)
      })
    } else setBus({ days: newValues })
  }

  useEffect(() => {
    setBus({ days: allDays ? days : [] })
  }, [allDays])

  useEffect(() => {
    setBus({ amenities: allAmenities ? amenities : [] })
  }, [allAmenities])

  return (
    <form
      id='busForm'
      onSubmit={e => handleSubmit(e, bus)}
      onChange={handleChange}
    >
      <Grid container spacing={4}>
        <Grid item xs={5} sm={3}>
          <TextField
            required
            name='number'
            label='Bus Number'
            value={bus.number}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            name='name'
            label='Bus Name'
            value={bus.name}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            required
            name='source'
            label='Source Location'
            value={bus.source}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            required
            name='departure'
            label='Depart Time'
            type='time'
            InputLabelProps={{ shrink: true }}
            value={bus.departure}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            required
            name='destination'
            label='Destination Location'
            value={bus.destination}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            required
            name='arrival'
            label='Arrival Time'
            type='time'
            value={bus.arrival}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            select
            onChange={handleChange}
            label='Type'
            name='type'
            value={bus.type}
            fullWidth
          >
            <MenuItem value='non-AC seater'>Non-AC Seater</MenuItem>
            <MenuItem value='non-AC seater sleeper'>
              Non-AC Seater Sleeper
            </MenuItem>
            <MenuItem value='AC seater sleeper'>AC Seater Sleeper</MenuItem>
            <MenuItem value='volvo'>Volvo</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            select
            required
            onChange={handleChange}
            label='Seat Chart'
            name='chart'
            value={bus.chart}
            fullWidth
          >
            <MenuItem value='35-seater'>35-Seater</MenuItem>
            <MenuItem value='45-seater'>45-Seater</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs>
          <FormControl classes={{ root: classes.root }}>
            <InputLabel
              variant='outlined'
              classes={{ outlined: classes.outlined }}
            >
              Running Days
            </InputLabel>
            <ToggleButton
              value='all'
              selected={allDays && bus.days.length === days.length}
              onChange={() => setAllDays(!allDays)}
              style={{ marginRight: 3 }}
              classes={{ selected: classes.button }}
            >
              All
            </ToggleButton>
            <ToggleButtonGroup
              id='days'
              value={bus.days}
              onChange={handleToggleChange}
            >
              {days.map((day, i) => (
                <ToggleButton value={day} color='secondary' key={i}>
                  {day[0]}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl classes={{ root: classes.root }}>
            <InputLabel
              variant='outlined'
              classes={{ outlined: classes.outlined }}
              shrink={false}
            >
              Amenities
            </InputLabel>
            <FormGroup
              classes={{ root: classes.root }}
              style={{ marginTop: 19 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      allAmenities && bus.amenities.length === amenities.length
                    }
                    value='all'
                    onChange={() => setAllAmenities(!allAmenities)}
                    name='amenities'
                    color='primary'
                  />
                }
                label='All'
                className={classes.checkAll}
                classes={{ label: classes.labelBold }}
              />
              {amenities.map((value, i) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={bus.amenities.includes(value)}
                      onChange={handleToggleChange}
                      value={value}
                      name='amenities'
                    />
                  }
                  label={value}
                  classes={{ label: classes.label }}
                  key={i}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}
