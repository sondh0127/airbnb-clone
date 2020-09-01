import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiDivider: {
      root: {
        marginTop: '16px',
        marginBottom: '16px',
      },
    },
    MuiButton: {
      root: {
        display: 'inline-block',
        transitionProperty: 'background, border-color, color',
        transitionTimingFunction: 'ease-out',
        transitionDuration: '0.2s',
        boxShadow: 'none',
        textAlign: 'center',
        letterSpacing: 'normal',
        width: 'auto',
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      sizeSmall: {
        paddingTop: '6px',
        paddingBottom: '6px',
        paddingLeft: '15px',
        paddingRight: '15px',
        position: 'relative',
        textDecoration: 'none',
        borderRadius: '4px',
        borderWidth: ' 1px',
        fontSize: ' 14px',
        fontWeight: 600,
        lineHeight: ' 22px',
      },
      sizeLarge: {
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: '16px',
        fontWeight: '800',
        lineHeight: '24px',
        paddingLeft: '22px',
        paddingRight: '22px',
        borderRadius: '4px',
        borderWidth: '2px',
      },
    },
  },
  palette: {
    primary: {
      light: '#339ca0',
      main: '#008489',
      dark: '#005c5f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7b7f',
      main: '#ff5a5f',
      dark: '#c64044',
      contrastText: '#fff',
    },
    error: {
      light: '#e06033',
      main: '#d93900',
      dark: '#972700',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'Varela Round', sans-serif",
    fontSize: 14,
    textTransform: 'none',
    color: '#484848',
    button: {
      textTransform: 'none',
    },
  },
});
export const sizes = {
  phone: `744px`,
  tablet: `960px`,
  laptop: `1128px`,
  desktop: `1440px`,
};
