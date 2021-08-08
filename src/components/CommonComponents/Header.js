import { Box, Fab, Typography, makeStyles } from '@material-ui/core'
// import { AddIcon } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
const useStyles = makeStyles(theme => ({
  actionPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px',
    height: '70px'
  },
  heading: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  icon: {
    color: theme.palette.primary.contrastText
  }
}))

export default function Header ({ heading, onClick }) {
  const classes = useStyles()
  return (
    <Box className={classes.actionPanel}>
      {/* REPLACE HEADING WITH FILTERS? */}
      <Typography variant='h5' className={classes.heading}>
        {heading}
      </Typography>
      <Fab onClick={onClick} color='secondary' className={classes.icon}>
        <AddIcon style={{ fontSize: 55 }} />
      </Fab>
    </Box>
  )
}
