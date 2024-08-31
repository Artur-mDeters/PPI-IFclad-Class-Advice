import { useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const InputFile = styled("input")({
  display: "none",
});

// eslint-disable-next-line react/prop-types
const FileSelector = ({ onFileChange }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
      console.log(file.name); // Envia o nome do arquivo para o componente pai
    }
  };

  return (
    <Paper style={{ display: "flex", alignItems: "center" }}>
      <InputFile
        accept="*/*"
        id="file-upload"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          style={{
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "6px 12px",
            textTransform: "none",
          }}
        >
          Selecionar Arquivo
        </Button>
      </label>

      <Typography variant="body1">
        {fileName
          ? `Arquivo Selecionado: ${fileName}`
          : "Nenhum arquivo selecionado"}
      </Typography>
    </Paper>
  );
};

export default FileSelector;
