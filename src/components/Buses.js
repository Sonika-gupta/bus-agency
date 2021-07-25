import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getBuses } from '../api'
import BusList from './BusList'
import BusForm from './BusForm'
import { addBus } from '../api'

const useStyles = makeStyles(theme => ({
  actionPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
  },
  form: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main
  },
  dialogContent: {
    overflow: 'visible'
  },
  dialogActions: {
    margin: 20,
    justifyContent: 'space-between'
  }
}))

export default function Buses () {
  const [buses, setBuses] = useState([])
  const [open, setOpen] = useState(true)
  const [action, setAction] = useState('add')
  const classes = useStyles()

  async function handleSubmit (e, bus) {
    e.preventDefault()
    try {
      const newBus = await addBus(bus)
      setBuses([...buses, newBus])
      window.alert(`Bus Added with id ${newBus.id}`)
      setOpen(false)
      console.log(e.target, newBus)
    } catch (err) {
      console.log(JSON.stringify(err))
      window.alert(JSON.stringify(err).message)
    }
  }
  console.log(buses)
  useEffect(() => {
    ;(async () => {
      setBuses(await getBuses())
    })()
    return () => setBuses([])
  }, [])

  return (
    <>
      <Box className={classes.actionPanel}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => {
            setOpen(true)
            setAction('add')
          }}
        >
          Add Bus
        </Button>
      </Box>
      <BusList buses={buses} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='md'
        classes={{ paper: classes.form }}
      >
        <DialogTitle>{action.toUpperCase()} BUS</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <BusForm handleSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant='contained' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            form='busForm'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
