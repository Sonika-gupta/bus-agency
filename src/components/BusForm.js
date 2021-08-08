import { useReducer } from 'react'
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
import { PriceInput } from './CommonComponents'
import { initBus, busType, busChartType, days, amenities } from '../values'

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
  toggleButton: {
    color: 'inherit'
  },
  checkAll: { width: '100%' }
}))

export default function BusForm ({ editBus, handleSubmit }) {
  const classes = useStyles()

  const [bus, setBus] = useReducer(
    (bus, newValue) => ({ ...bus, ...newValue }),
    editBus?.id ? editBus : initBus
  )
  console.log('Bus Loaded')

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
    } else setBus({ runningDays: newValue })
  }

  function checkAllDays () {
    return bus.runningDays.length === days.length
  }

  function handleToggleAll (e, newValue) {
    e.stopPropagation()
    console.log(e.target.selected, newValue)
    if (e.target.name === 'amenities') {
      setBus({ amenities: newValue ? amenities : [] })
    } else setBus({ runningDays: checkAllDays() ? [] : days })
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
            name='busNumber'
            label='Bus Number'
            value={bus.busNumber}
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            name='busName'
            label='Bus Name'
            value={bus.busName}
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
            name='departTime'
            label='Depart Time'
            type='time'
            InputLabelProps={{ shrink: true }}
            value={bus.departTime}
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
            name='arrivalTime'
            label='Arrival Time'
            type='time'
            value={bus.arrivalTime}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        {/* FARE */}
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Seat Fare'
            name='seatFare'
            value={bus.seatFare}
          />
        </Grid>
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Sleeper Fare'
            name='sleeperFare'
            value={bus.sleeperFare}
          />
        </Grid>
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Agent Seat Fare'
            name='agentSeatFare'
            value={bus.agentSeatFare}
          />
        </Grid>
        <Grid item xs={3}>
          <PriceInput
            onChange={handleChange}
            label='Agent Sleeper Fare'
            name='agentSleeperFare'
            value={bus.agentSleeperFare}
          />
        </Grid>
        {/* BUS DETAILS */}
        <Grid item xs={4}>
          <TextField
            select
            onChange={handleChange}
            label='Type'
            name='busType'
            value={bus.busType}
            style={{ textTransform: 'capitalize' }}
            fullWidth
          >
            {busType.map((type, i) => (
              <MenuItem
                key={i}
                value={type}
                style={{ textTransform: 'capitalize' }}
              >
                {type}
              </MenuItem>
            ))}
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
            {busChartType.map((type, i) => (
              <MenuItem value={type} key={i}>
                {type}
              </MenuItem>
            ))}
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
              className={classes.toggleButton}
              style={{ marginRight: 3 }}
            >
              All
            </ToggleButton>
            <ToggleButtonGroup
              id='runningDays'
              value={bus.runningDays}
              onChange={handleToggleChange}
            >
              {days.map((day, i) => (
                <ToggleButton
                  value={day}
                  key={i}
                  className={classes.toggleButton}
                >
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
