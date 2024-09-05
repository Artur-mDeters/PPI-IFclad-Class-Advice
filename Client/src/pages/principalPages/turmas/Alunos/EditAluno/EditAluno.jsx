import EditPage from "../../../../../components/createAndEditPages/EditPage";
import axios from "axios";
import classes from "./EditAluno.style";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, TextField } from "@mui/material";

const EditAluno = () => {
  const { idAluno, id } = useParams();
  const [studentData, setDataAluno] = useState([]);
  const navigate = useNavigate();

  const getDataAluno = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/alunos/" + idAluno
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getDataAluno();
        setDataAluno(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAluno]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDataAluno((prevState) => {
      const updatedAluno = { ...prevState[0], [id]: value };
      return [updatedAluno];
    });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:3030/alunos/" + idAluno, studentData[0]);
      navigate("../turmas/" + id + "/alunos");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar aluno.");
    }
  };

  const handleExclude = async () => {
    try {
      await axios.delete("http://localhost:3030/alunos/" + idAluno);
      navigate("../turmas/" + id + "/alunos");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EditPage
      title={"Editar aluno: " + studentData[0]?.nome || ""}
      buttonExcludeName="excluir aluno"
      buttonSaveFunction={handleSave}
      returnTo={"../turmas/" + id + "/alunos"}
      buttonExcludeFunction={handleExclude}
    >
      <Box sx={classes.principalBox}>
        <Box sx={classes.boxInputs}>
          <TextField
            fullWidth
            margin="dense"
            id="nome"
            label="Nome completo"
            value={studentData[0]?.nome || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            id="matricula"
            label="Matricula"
            value={studentData[0]?.matricula || ""}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={classes.boxInputs}>
          <TextField
            fullWidth
            margin="dense"
            id="email"
            label="Email"
            value={studentData[0]?.email || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            id="sexo"
            label="Sexo"
            value={studentData[0]?.sexo || ""}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={classes.boxInputs}>
          <TextField
            fullWidth
            margin="dense"
            id="nascimento"
            label="Data de Nascimento"
            value={studentData[0]?.nascimento || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            id="cidade"
            label="Cidade"
            value={studentData[0]?.cidade || ""}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={classes.boxInputs}>
          <TextField
            fullWidth
            margin="dense"
            id="uf"
            label="UF"
            value={studentData[0]?.uf || ""}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            id="interno"
            label="Interno"
            value={studentData[0]?.interno || ""}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
    </EditPage>
  );
};

export default EditAluno;
