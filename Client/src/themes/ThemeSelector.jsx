import React from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
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
} from "./themes";
import { useThemeContext } from "./Themecontext";
import classes from "./ThemeSelector.style"

const themes = {
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
};

const ThemeSelector = () => {
  const { changeTheme } = useThemeContext();
  const [selectedTheme, setSelectedTheme] = React.useState("defaultDark");

  const handleThemeChange = (event) => {
    const newThemeKey = event.target.value;
    setSelectedTheme(newThemeKey);
    changeTheme(themes[newThemeKey]);
  };

  return (
    <FormControl fullWidth style={classes.formControl}>
      <InputLabel id="theme-select-label">Escolha um tema</InputLabel>
      <Select
        labelId="theme-select-label"
        id="theme-select"
        value={selectedTheme}
        onChange={handleThemeChange}
        label="Escolha um tema"
      >
        {Object.keys(themes).map((themeKey) => (
          <MenuItem key={themeKey} value={themeKey}>
            {themeKey}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ThemeSelector;
