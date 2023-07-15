import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    third: Palette['primary'];
    fourth: Palette['primary'];
    pink: Palette['primary'];
    lightpink: Palette['primary'];
    green: Palette['primary'];
    lightgreen: Palette['primary'];
    white: Palette['primary'];
    black: Palette['primary'];
  }

  interface PaletteOptions {
    third?: PaletteOptions['primary'];
    fourth: PaletteOptions['primary'];
    pink: PaletteOptions['primary'];
    lightpink: PaletteOptions['primary'];
    green: PaletteOptions['primary'];
    lightgreen: PaletteOptions['primary'];
    white: PaletteOptions['primary'];
    black: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    third: true;
    fourth: true;
    pink: true;
    lightpink: true;
    green: true;
    lightgreen: true;
    black: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#EF3753',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#EF3753',
    },
    third: {
      main: '#FFFFFF',
      contrastText: '#999999',
    },
    fourth: {
      main: '#999999',
      contrastText: '#FFFFFF',
    },
    pink: {
      main: '#F79BA9',
      contrastText: '#FFFFFF',
    },
    lightpink: {
      main: '#FFE7EB',
      contrastText: '#EF3753',
    },
    green: {
      main: '#36B282',
      contrastText: '#FDFDFD',
    },
    lightgreen: {
      main: '#81CC93',
      contrastText: '#FFFFFF',
    },
    white: {
      main: '#FFFFFF',
      contrastText: '#333333',
    },
    black: {
      main: '#333333',
      contrastText: '#FFFFFF',
    },
  },
});

export const CustomizedTheme = createTheme(defaultTheme, {});
