import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import axios from "axios";

import { Box, TextField } from "@mui/material";

// !inicio da página >>>>>>
const CreateSubjectPage = () => {
  const navigate = useNavigate();
  const [subjectData, setSubjectData] = useState([{ nome: "" }]); // Alinhado para refletir o campo correto
  const [errors, setErrors] = useState({ nome: "" }); // Estados de erro ajustados

  const validatedFields = () => {
    let valid = true;
    const newErrors = { nome: "" }; // Alinhado com o campo correto

    if (!subjectData[0]?.nome) {
      newErrors.nome = "O nome da disciplina é obrigatório!";
      valid = false;
    }

    if (!subjectData[0]?.nome) {
      newErrors.nome = "O nome da disciplina é obrigatório!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value

    if (name === "nome") {
      formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    }

    try {
      setSubjectData((prevState) => {
        const inputsChange = { ...prevState[0], [name]: formattedValue };
        return [inputsChange];
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const saveAndRedirect = async () => {
    if (validatedFields()) {
      await axios
        .post("http://localhost:3030/disciplina", {
          nome: subjectData[0]?.nome, // Alinhado com o campo usado no backend
        })
        .then((response) => {
          console.log(response);
          navigate("/disciplinas");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <CreatePage
      Title={"Disciplina"}
      buttonSaveFunction={saveAndRedirect}
      returnTo={"/disciplinas"}
    >
      <Box>
        <TextField
          fullWidth
          id="subjectName"
          name="nome"
          label="Nome"
          value={subjectData[0]?.nome || ""}
          onChange={handleInputsChange}
          margin="dense"
          error={!!errors.nome} // Corrigido para usar o campo correto
          helperText={errors.nome} // Mensagem de erro
        />
      </Box>
    </CreatePage>
  );
};

export default CreateSubjectPage;
