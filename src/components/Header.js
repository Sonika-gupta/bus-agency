import { Box, Button, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  actionPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 40
  }
}))

export default function Header ({ heading, action }) {
  const classes = useStyles()
  return (
    <Box className={classes.actionPanel}>
      <Typography variant='h5'>{heading}</Typography>
      <Button color='primary' variant='contained' onClick={action.onClick}>
        {action.title}
      </Button>
    </Box>
  )
}
