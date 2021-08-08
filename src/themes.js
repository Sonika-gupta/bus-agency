const color = {
  lightBlue: '#5586c0',
  orange: '#d7b73d',
  turquoise: '#00b3b0',
  navyBlue: '#1b243f',
  greyBlue: '#b9c5ca'
}
const CadetTheme = {
  palette: {
    primary: {
      main: color.lightBlue,
      contrastText: '#fff'
    },
    secondary: {
      main: color.orange
    },
    action: {
      active: color.lightBlue,
      selected: 'rgba(255, 255, 255, 0.6)',
      hover: 'rgba(255, 255, 255, 0.3)'
    },
    text: {
      primary: color.navyBlue
    },
    background: {
      paper: color.navyBlue, // navy blue
      default: '#ecf3f3'
    },
    common: {
      white: '#fafafa',
      black: '#0A100D' // rich black fogra 39
    },
    divider: 'rgba(0, 0, 0, 1)'
  },
  typography: {
    fontSize: 14
  },
  overrides: {
    MuiGrid: {
      item: {
        marginTop: 3
      }
    },
    MuiDivider: {
      root: {
        marginBottom: 5,
        height: 2
      }
    },
    MuiIconButton: {
      root: {
        opacity: 0.9
      }
    },
    MuiInputBase: {
      input: {
        paddingLeft: 2
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        opacity: 0.7
      }
    },
    MuiMenuItem: {
      root: {
        color: 'white'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: 'rgba(255, 255, 255, 0.85)'
        }
      }
    },
    MuiTableCell: {
      body: {
        color: 'black'
      },
      head: {
        backgroundColor: color.greyBlue,
        color: 'black'
      }
    },
    MuiToggleButton: {
      root: {
        padding: '2px 11px',
        marginTop: 19
      }
    }
  }
}

const theme2 = {
  palette: {
    primary: {
      main: '#f0f4c3' // green
    },
    secondary: {
      main: '#ffe082'
    },
    text: {
      primary: '#000',
      secondary: '#010101'
    },
    background: {
      paper: '#fff',
      default: '#f1f1f1'
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
}

export { CadetTheme, theme2 }
