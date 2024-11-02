/* eslint-disable no-unused-vars */
import { ThemeProvider, CssBaseline} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import {
  defaultDark,
  defaultLight,
  greenDark,
  greenLight,
  blueDark,
  yellowDark,
  purpleLight,
  orangeDark,
  pinkLight,
  cyanDark,
  tealLight,
  indigoDark,
  grayDarkTheme,
  highContrast,
} from "./themes/themes";

// eslint-disable-next-line react/prop-types
const Theme = ({ children }) => {
  const theme = defaultDark


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}

    </ThemeProvider>
  );
};

export default Theme;
