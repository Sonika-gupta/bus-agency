import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Drawer,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Menu from './Menu.js'
import Buses from './Buses'
import CompanyLogo from './CompanyLogo.js'
// import Users from './Users'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  menuButton: {
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  /* container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }, */
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))

export default function Dashboard () {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          {open ? (
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
          ) : (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Divider />
          <Menu />
        </Drawer>
        <main className={classes.content}>
          {/* <CompanyLogo /> */}
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path='/buses'>
              <Buses />
            </Route>
            <Route path='/users'>{/* <Users /> */}</Route>
            <Route path='/bookings'></Route>
            <Route path='/settings'></Route>
            <Route path='/'>
              <Container className={classes.container}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                      {/* <Chart /> */}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                      {/* <Deposits /> */}
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>{/* <Orders /> */}</Paper>
                  </Grid>
                </Grid>
              </Container>
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}
