import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
// import ThemeSelector from "./themes/ThemeSelector";
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


// import { defaultDark } from "./themes/themes";

// eslint-disable-next-line react/prop-types
const Theme = ({ children }) => {
  const [theme, setTheme] = useState(defaultDark);

  return (
    <>
      {/* <ThemeSelector onThemeChange={setTheme} /> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Theme;
