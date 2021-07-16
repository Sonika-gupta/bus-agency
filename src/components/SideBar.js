import { BrowserRouter as Router, NavLink as Link } from 'react-router-dom'
import {
  makeStyles,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import { Group, DirectionsBus, Settings } from '@material-ui/icons'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline'

const theme = createMuiTheme({
  palette: {
    // type: 'dark'
  }
})
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 240,
    paddingTop: 60
  },
  text: {
    textTransform: 'capitalize'
  },
  selected: {
    all: 'inherit',
    backgroundColor: theme.palette.action.focus
  }
}))

const mainMenu = [
  {
    title: 'users',
    icon: <Group />
  },
  {
    title: 'buses',
    icon: <DirectionsBus />
  }
]

const userMenu = [
  {
    title: 'settings',
    icon: <Settings />
  }
]

const partitions = [mainMenu, userMenu]
export default function SideBar () {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <Drawer variant='permanent' classes={{ paper: classes.drawerPaper }}>
          <Divider />
          <Router>
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
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText
                          primary={title}
                          className={classes.text}
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
              </div>
            ))}
          </Router>
        </Drawer>
      </ScopedCssBaseline>
    </ThemeProvider>
  )
}
