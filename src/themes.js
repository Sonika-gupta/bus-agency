const CadetTheme = {
  palette: {
    // type: 'dark',
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
      // default: '#E5E4DC' // alabaster
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
    },
    MuiTableCell: {
      body: {
        color: 'black'
      }
    },
    MuiIconButton: {
      root: {
        opacity: 0.7
      }
    },
    MuiListItemIcon: {
      root: {
        opacity: 0.7
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: 'rgba(255, 255, 255, 0.85)'
        }
      }
    }
  }
}

const CoolTheme = {
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

export { CadetTheme, CoolTheme }
