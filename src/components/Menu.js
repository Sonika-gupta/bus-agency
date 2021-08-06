import { NavLink as Link } from 'react-router-dom'
import {
  Commute,
  DirectionsBus,
  Dashboard,
  Group,
  LibraryBooks,
  Settings
} from '@material-ui/icons'
import {
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
}))

const mainMenu = [
  {
    title: 'dashboard',
    icon: <Dashboard />
  },
  {
    title: 'bookings',
    icon: <LibraryBooks />
  },
  {
    title: 'buses',
    icon: <DirectionsBus />
  },
  {
    title: 'users',
    icon: <Group />
  },
  {
    title: 'service providers',
    icon: <Commute />
  }
]

const userMenu = [
  {
    title: 'settings',
    icon: <Settings />
  }
]

const partitions = [mainMenu, userMenu]
export default function Menu ({ open }) {
  const classes = useStyles()
  return (
    <div>
      <Divider />
      {partitions.map((menu, i) => (
        <div key={i}>
          <List>
            {menu.map(({ title, icon }, i) => (
              <ListItem
                button
                component={Link}
                to={`/${title}`}
                activeClassName={classes.active}
                key={i}
              >
                <Tooltip
                  title={open ? '' : title.toUpperCase()}
                  placement='right'
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={title}
                  style={{ textTransform: 'capitalize' }}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </div>
  )
}
