import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
// import CompanyLogo from '../CompanyLogo'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 36
  }
}))
export default function TitleBar ({ toggleDrawer }) {
  const classes = useStyles()
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer}
          edge='start'
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {/* <CompanyLogo /> */}
      </Toolbar>
    </AppBar>
  )
}
