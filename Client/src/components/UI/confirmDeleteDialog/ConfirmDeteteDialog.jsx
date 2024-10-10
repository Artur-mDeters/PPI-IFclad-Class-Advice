import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from "@mui/material";
import Theme from "../../../theme";

// eslint-disable-next-line react/prop-types
const ConfirmDeleteDialog = ({ open, onClose, onConfirm, textAlert }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (password === "123") {
      onConfirm(); // Chama a função de confirmação se a senha estiver correta
      setPassword("");
      setError("");
      onClose(); // Fecha o diálogo
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <Theme>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <Typography margin={"10px"} variant="body1">
          Ao confirmar todas as informações ligadas a {textAlert} serão excluídas permanentemente!
        </Typography>
        <DialogContent>
          <TextField
            autoFocus  
            margin="dense"
            id="password"
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={error || "Digite sua senha"}
            error={!!error} // Mostra o estado de erro
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Theme>
  );
};

export default ConfirmDeleteDialog;
