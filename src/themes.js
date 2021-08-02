const CadetTheme = {
  palette: {
    primary: {
      main: '#00b3b0',
      contrastText: '#fff'
    },
    secondary: {
      main: '#d7b73d'
    },
    action: {
      active: '#5586c0',
      activatedOpacity: 0.8
    },
    background: {
      paper: ' #1b243f',
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
        margin: '5px auto',
        height: 2
      }
    },
    MuiIconButton: {
      root: {
        opacity: 0.7
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
      '&$selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.85)'
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
        backgroundColor: '#b9c5ca',
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
