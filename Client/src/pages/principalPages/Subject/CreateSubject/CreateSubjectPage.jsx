import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import axios from "axios";

import { Box, TextField } from "@mui/material";

// !inicio da página >>>>>>
const CreateSubjectPage = () => {
  const navigate = useNavigate();

  const [subjectData, setSubjectData] = useState([{ nome: "" }]); // Ajustei para refletir o campo correto

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevState) => {
      const inputsChange = { ...prevState[0], [name]: value };
      return [inputsChange];
    });
  };

  const saveAndRedirect = async () => {
    await axios
      .post("http://localhost:3030/disciplina", {
        nome: subjectData[0]?.nome, // Alinhei com o campo usado no backend
      })
      .then((response) => {
        console.log(response);
        navigate("/disciplinas");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <CreatePage Title={"Disciplina"} buttonSaveFunction={saveAndRedirect} returnTo={"/disciplinas"}>
      <Box>
        <TextField
          fullWidth
          id="nameSubject"
          label="Nome"
          name="nome" // Alinhei o nome do campo com o back-end
          value={subjectData[0]?.nome}
          onChange={handleInputsChange}
        />
      </Box>
    </CreatePage>
  );
};

export default CreateSubjectPage;
