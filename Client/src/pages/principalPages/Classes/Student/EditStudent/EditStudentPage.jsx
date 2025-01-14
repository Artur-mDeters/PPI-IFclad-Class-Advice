import EditPage from "../../../../../components/createAndEditPages/EditPage";
import axios from "axios";
import classes from "./EditAluno.style";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmDeleteDialog from "../../../../../components/UI/confirmDeleteDialog/ConfirmDeteteDialog";

import {
  Box,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";

const EditStudentPage = () => {
  const { idAluno: idStudent, id } = useParams();
  const [studentData, setStudentData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo de exclusão
  const navigate = useNavigate();

  const getStudentData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/alunos/" + idStudent
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };


  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getStudentData();
        setStudentData(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idStudent]);

  const handleInputChange = (e) => {
    const { id, name, value } = e.target;

    const field = id || name; // Usar 'id' para TextField e 'name' para Select

    let formattedValue = value;

    if (field === "nascimento") {
      // Remove caracteres não numéricos e limita a 8 dígitos
      const digitsOnly = value.replace(/\D/g, "").slice(0, 8);

      // Formata a data
      formattedValue = digitsOnly;
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
          2
        )}`;
      }
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(
          5
        )}`;
      }
    } else if (field === "matricula") {
      formattedValue = value.replace(/[^\d]/g, "");
      
      if (formattedValue.length <= 4) {
        formattedValue = 2024;
      }
    } else if (field === "uf") {
      if (formattedValue.length > 2) {
        return;
      } else {
        formattedValue = value.replace(/[^a-zA-Z]/g, '').toUpperCase();
      }
    }

    setStudentData((prevState) => {
      const updatedAluno = { ...prevState[0], [field]: formattedValue };
      return [updatedAluno];
    });
  };

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:3030/alunos/" + idStudent, {
        name: studentData[0]?.nome,
        registration: studentData[0]?.matricula,
        email: studentData[0]?.email,
        gender: studentData[0]?.sexo,
        dateOfBirth: studentData[0]?.nascimento,
        city: studentData[0]?.cidade,
        federativeUnity: studentData[0]?.uf,
        internal: studentData[0]?.interno,
      });

      navigate("../turmas/" + id + "/alunos");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar aluno.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3030/alunos/" + idStudent);
      navigate("../turmas/" + id + "/alunos");
    } catch (err) {
      console.error(err);
    }
  };


  console.log(studentData[0]);

  return (
    <>
    <EditPage
      title={"Editar aluno: " + studentData[0]?.nome || ""}
      buttonExcludeName="excluir aluno"
      buttonSaveFunction={handleSave}
      returnTo={"../turmas/" + id + "/alunos"}
      buttonExcludeFunction={handleDeleteClick}
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
          <FormControl margin="dense" fullWidth>
            <InputLabel id="gender_label">Gênero</InputLabel>
            <Select
              labelId="gender_label"
              label="Sexo"
              name="sexo"
              variant="outlined"
              value={studentData[0]?.sexo || ""} // Exibe o valor atual ou uma string vazia
              onChange={handleInputChange}
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
            </Select>
          </FormControl>
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
          <FormControl margin="dense" fullWidth>
            <InputLabel id="internal_label">Interno</InputLabel>
            <Select
              labelId="internal_label"
              label="Interno"
              name="interno"
              variant="outlined"
              value={studentData[0]?.interno || ""} // Use o valor atual ou uma string vazia
              onChange={handleInputChange}
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </EditPage>
    <ConfirmDeleteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        textAlert="este curso ( incluindo os alunos )"
      />
    </>
  );
};

export default EditStudentPage;
