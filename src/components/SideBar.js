import {
  makeStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import SettingsIcon from '@material-ui/icons/Settings'
import clsx from 'clsx'
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    paddingTop: '60px'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  }
}))
export default function SideBar ({ open, toggleDrawer }) {
  const classes = useStyles()
  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      onMouseOver={toggleDrawer}
      onMouseOut={toggleDrawer}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key='Users'>
          <ListItemIcon>
            <GroupIcon></GroupIcon>
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItem>
        <ListItem button key='Buses'>
          <ListItemIcon>
            <DirectionsBusIcon></DirectionsBusIcon>
          </ListItemIcon>
          <ListItemText primary='Buses' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key='Settings'>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItem>
      </List>
    </Drawer>
  )
}
