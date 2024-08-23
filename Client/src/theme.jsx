import { ThemeProvider, CssBaseline } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { defaultDark, defaultLight } from "./themes/themes";

let theme = defaultDark;

// eslint-disable-next-line react/prop-types
const Theme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
