// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import TitleBar from './components/TitleBar'
import SideBar from './components/SideBar'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export default function App () {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <TitleBar toggleDrawer={handleDrawerToggle} />
      <SideBar open={open} toggleDrawer={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  )
}
