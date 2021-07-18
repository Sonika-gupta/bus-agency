import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Dashboard from './components/Dashboard'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A7684' // Cadet
    },
    secondary: {
      main: '#ffb031' //bright yellow crayola
    },
    text: {
      primary: '#fff',
      secondary: '#0A100D' // rich black fogra 39
    },
    background: {
      // paper: '#B9BAA3', //Sage
      paper: '#5A7684', // Cadet
      default: '#E5E4DC' // alabaster
    }
  },
  typography: {
    fontSize: 12
  }
})

export default function App () {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        {/* <SideBar /> */}
        <Dashboard />
      </ThemeProvider>
    </div>
  )
}
