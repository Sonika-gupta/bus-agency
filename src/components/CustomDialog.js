import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  form: {
    backgroundColor: theme.palette.background.default
  },
  dialogTitle: {
    // color: theme.palette.primary.main
    textTransform: 'uppercase'
  },
  dialogContent: {
    overflow: 'visible'
  },
  dialogActions: {
    margin: 20,
    justifyContent: 'space-between'
  }
}))

export default function CustomDialog ({
  open,
  onClose,
  maxWidth,
  title,
  form,
  actions
}) {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      classes={{ paper: classes.form }}
    >
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>{form}</DialogContent>
      <DialogActions className={classes.dialogActions}>{actions}</DialogActions>
    </Dialog>
  )
}
