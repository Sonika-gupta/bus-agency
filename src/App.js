import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { CadetTheme } from './themes'
import Dashboard from './components/Dashboard'

const theme = createTheme(CadetTheme)

export default function App () {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </div>
  )
}
