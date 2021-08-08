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
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'left' }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant='filled'
        elevation={5}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
