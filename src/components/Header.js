import { Box, IconButton, Typography, makeStyles } from '@material-ui/core'
import { AddCircleOutlineRounded } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  actionPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px'
  },
  heading: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
}))

export default function Header ({ heading, onClick }) {
  const classes = useStyles()
  return (
    <Box className={classes.actionPanel}>
      <Typography variant='h5' className={classes.heading}>
        {heading}
      </Typography>
      <IconButton onClick={onClick}>
        <AddCircleOutlineRounded style={{ fontSize: 60 }} />
      </IconButton>
    </Box>
  )
}
