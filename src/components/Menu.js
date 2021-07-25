import { NavLink as Link } from 'react-router-dom'
import {
  Group,
  DirectionsBus,
  Settings,
  LibraryBooks,
  Dashboard
} from '@material-ui/icons'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => {
  console.log(theme)
  return {
    selected: {
      backgroundColor: 'rgba(255, 255, 255, 0.75) !important'
    }
  }
})
const mainMenu = [
  {
    title: 'Dashboard',
    icon: <Dashboard />
  },
  {
    title: 'users',
    icon: <Group />
  },
  {
    title: 'buses',
    icon: <DirectionsBus />
  },
  {
    title: 'bookings',
    icon: <LibraryBooks />
  }
]

const userMenu = [
  {
    title: 'settings',
    icon: <Settings />
  }
]

const partitions = [mainMenu, userMenu]
export default function Menu () {
  const classes = useStyles()
  return (
    <div>
      {partitions.map((menu, i) => (
        <div key={i}>
          <List>
            {menu.map(({ title, icon }) => (
              <Link
                to={`/${title}`}
                activeClassName={classes.selected}
                style={{ textDecoration: 'none', color: 'inherit' }}
                key={title}
              >
                <ListItem button>
                  <ListItemIcon style={{ color: 'inherit', opacity: 0.8 }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    style={{ textTransform: 'capitalize' }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </div>
  )
}
