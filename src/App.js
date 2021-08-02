import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { CadetTheme as theme } from './themes'
import Dashboard from './components/Dashboard'

export default function App () {
  return (
    <div className='App'>
      <ThemeProvider theme={createTheme(theme)}>
        <Dashboard />
      </ThemeProvider>
    </div>
  )
}
