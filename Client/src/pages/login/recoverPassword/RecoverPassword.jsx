import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Theme from "../../../theme";

const RecoverPassword = () => {
  const id_usuario = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRecoverPassword = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não são iguais");
    } else if (password === "") {
      setError("Adicione uma senha!");
    } else {
      setError("");
      try {
        await axios.put('http://localhost:3030/recover-password', {
            id_usuario,
            password
        });
        setOpenSnackbar(true);
        console.log("ok", id_usuario, password)
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setError("Erro ao alterar a senha");
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Theme>
      <Box sx={{ height: "100vh", alignItems: "center", display: "flex" }}>
        <Paper
          elevation={8}
          sx={{
            padding: "15px",
            width: "600px",
            height: "300px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography flex={1} variant="h4">
            Adicione uma senha!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="filled"
              label="Adicione uma senha"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="filled"
              label="Repita a senha"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Snackbar open="open" autoHideDuration={4000}>
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              </Snackbar>
            )}
            <Button variant="contained" onClick={handleRecoverPassword}>
              Recover Password
            </Button>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={openSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Senha alterada com sucesso!
        </Alert>
      </Snackbar>
    </Theme>
  );
};

export default RecoverPassword;
