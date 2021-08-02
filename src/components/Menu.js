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
  Divider
} from '@material-ui/core'

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
  return (
    <div>
      <Divider />
      {partitions.map((menu, i) => (
        <div key={i}>
          <List>
            {menu.map(({ title, icon }) => (
              <Link
                to={`/${title}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                key={title}
              >
                <ListItem button>
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
              </Link>
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </div>
  )
}
