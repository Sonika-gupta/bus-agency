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
      primary: '#fff'
      // secondary: '#fafafa'
    },
    background: {
      // paper: '#B9BAA3', //Sage
      paper: '#5A7684', // Cadet
      default: '#E5E4DC' // alabaster
    },
    common: {
      white: '#fafafa',
      black: '#0A100D' // rich black fogra 39
    },
    action: {
      selected: 'rgba(255, 255, 255, 0.75)'
    }
  },
  typography: {
    fontSize: 14
  },
  overrides: {
    MuiInputBase: {
      input: {
        paddingLeft: 2,
        color: '#5A7684' // Cadet
      }
    },
    MuiToggleButton: {
      root: {
        padding: '2px 11px',
        marginTop: 19
      }
    },
    MuiGrid: {
      item: {
        marginTop: 3
      }
    }
  }
})

export default function App () {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </div>
  )
}
