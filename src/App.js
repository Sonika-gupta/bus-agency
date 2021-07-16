import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TitleBar from './components/TitleBar'
import SideBar from './components/SideBar'
import BusList from './components/BusList'
import './App.css'

export default function App () {
  return (
    <div className='App'>
      <TitleBar />
      <div className='main'>
        <SideBar />
        <Router>
          <Switch>
            <Route path='/buses'>
              <BusList />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}
