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
import PriceInput from './PriceInput'
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

export default function BusForm ({ editBus, handleSubmit }) {
  const classes = useStyles()

  const [bus, setBus] = useReducer(
    (bus, newValue) => ({ ...bus, ...newValue }),
    editBus?.id ? editBus : initBus
  )

  console.log('Bus', bus)
  function handleChange (e) {
    console.log(e.target.name, e.target.value)
    setBus({ [e.target.name]: e.target.value })
  }

  function handleToggleChange (e, newValue) {
    e.stopPropagation()
    console.log(e.target.value, newValue)
    if (e.target.name === 'amenities') {
      setBus({
        amenities: newValue
          ? [...bus.amenities, e.target.value]
          : bus.amenities.filter(item => item !== e.target.value)
      })
    } else setBus({ running_days: newValue })
  }

  function checkAllDays () {
    return bus.running_days.length === days.length
  }

  function handleToggleAll (e, newValue) {
    e.stopPropagation()
    console.log(e.target.selected, newValue)
    if (e.target.name === 'amenities') {
      setBus({ amenities: newValue ? amenities : [] })
    } else setBus({ running_days: checkAllDays() ? [] : days })
  }

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
            name='bus_number'
            label='Bus Number'
            value={bus.bus_number}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            name='bus_name'
            label='Bus Name'
            value={bus.bus_name}
            fullWidth
          />
        </Grid>
        {/* ROUTE DETAILS */}
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
            name='depart_time'
            label='Depart Time'
            type='time'
            InputLabelProps={{ shrink: true }}
            value={bus.depart_time}
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
            name='arrival_time'
            label='Arrival Time'
            type='time'
            value={bus.arrival_time}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        {/* FARE */}
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Seat Fare'
            name='seat_fare'
            value={bus.seat_fare}
          />
        </Grid>
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Sleeper Fare'
            name='sleeper_fare'
            value={bus.sleeper_fare}
          />
        </Grid>
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Agent Seat Fare'
            name='agent_seat_fare'
            value={bus.agent_seat_fare}
          />
        </Grid>
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Agent Sleeper Fare'
            name='agent_sleeper_fare'
            value={bus.agent_sleeper_fare}
          />
        </Grid>
        {/* BUS DETAILS */}
        <Grid item xs={4}>
          <TextField
            select
            onChange={handleChange}
            label='Type'
            name='bus_type'
            value={bus.bus_type}
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
        {/* RUNNING DAYS */}
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
              selected={checkAllDays()}
              onChange={handleToggleAll}
              style={{ marginRight: 3 }}
              classes={{ selected: classes.button }}
            >
              All
            </ToggleButton>
            <ToggleButtonGroup
              id='running_days'
              value={bus.running_days}
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
        {/* AMENITIES */}
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
                    checked={bus.amenities.length === amenities.length}
                    onChange={handleToggleAll}
                    name='amenities'
                    color='primary'
                  />
                }
                label='All'
                className={classes.checkAll}
                classes={{ label: classes.labelBold }}
              />
              {amenities.map((value, i) => {
                return (
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
                )
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}
