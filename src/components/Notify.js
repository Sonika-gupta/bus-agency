import { Snackbar, Slide, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      minWidth: 300,
      '& ::first-letter': {
        textTransform: 'uppercase'
      }
    }
  }
}))

export default function Notify ({ open, message, type, handleClose }) {
  const classes = useStyles()
  return (
    <Snackbar
      className={classes.root}
      key={message}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      <Alert onClose={handleClose} severity={type} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  )
}
