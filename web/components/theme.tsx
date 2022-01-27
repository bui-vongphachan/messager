import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  spacing: 4,
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    primary: {
      main: "#FF6A62",
      dark: "#FF1307",
      light: "#FF958F",
      contrastText: "#FFCDCA",
    },
    secondary: {
      main: "#B73386",
      dark: "#A4146E",
      light: "#CA539E",
      contrastText: "white",
    },
  },
});
