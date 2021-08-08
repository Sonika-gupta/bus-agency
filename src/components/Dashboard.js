import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline, Drawer, makeStyles } from '@material-ui/core'
import Menu from './Menu.js'
import CompanyLogo from './CompanyLogo'
import Content from './Content.js'

const drawerWidth = 260

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    color: theme.palette.primary.contrastText,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100vh'
  },
  content: {
    flexGrow: 1,
    margin: '0 10px',
    overflow: 'auto'
  }
}))

export default function Dashboard () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Drawer
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <CompanyLogo />
          <Menu open={true} />
        </Drawer>
        <main className={classes.content}>
          <Content />
        </main>
      </Router>
    </div>
  )
}
