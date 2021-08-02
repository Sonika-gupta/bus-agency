import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Drawer, Container, Grid, Paper } from '@material-ui/core'
import Menu from './Menu.js'
import Buses from './Buses'
import Users from './Users'
import CompanyLogo from './CompanyLogo.js'

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
    margin: '10px',
    overflow: 'auto'
  },
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

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
          <Switch>
            <Route path='/buses'>
              <Buses />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/bookings'></Route>
            <Route path='/service providers'></Route>
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
