/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./classes.js";
import Theme from "../../theme.jsx";

export default function EditPage({
  title,
  buttonSaveFunction,
  buttonExcludeFunction,
  returnTo,
  buttonExcludeName,
  children,
}) {
  const navigate = useNavigate();
  return (
    <Theme>
      <Box sx={classes.principalBox}>
        <Box sx={classes.topCard}>
          <Typography variant="h3">{title}</Typography>
        </Box>
        <Box sx={classes.boxComponents}>
          <Box sx={classes.typographyBox}>
            <Typography marginBottom="20px" variant="h4">
              Insira os parâmetros desejados
            </Typography>
            <Typography variant="body1">
              Lembre-se de salvar antes de sair da página
            </Typography>
          </Box>
          <Box sx={classes.boxCentralize}>
            <Box sx={classes.textFieldBox}>
              {children}
              <Box sx={classes.buttonBox}>
                <Button
                  sx={{ marginRight: "20px" }}
                  size="large"
                  variant="contained"
                  onClick={buttonSaveFunction}
                >
                  ‎ ‎ ‎ Salvar ‎ ‎ ‎
                </Button>
                <Button
                  color="error"
                  size="large"
                  variant="contained"
                  onClick={() => navigate(returnTo)}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
            <Box sx={classes.buttonDeleteBox}>
              <Button color="error" variant="contained" onClick={buttonExcludeFunction}>
                {buttonExcludeName}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Theme>
  );
}
