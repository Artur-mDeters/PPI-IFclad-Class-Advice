import EditPage from "../../../../../components/createAndEditPages/EditPage";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAluno = () => {
  const { idAluno, id } = useParams();
  const [dataAluno, setDataAluno] = useState([]);
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
    const fetchData = async () => {
      try {
        const result = await getDataAluno();
        setDataAluno(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
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
      await axios.put("http://localhost:3030/alunos/" + idAluno, dataAluno[0]);
      navigate("../turmas/" + id + "/alunos");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar aluno.");
    }
  };

  const handleExclude = async () => {
    try {
      await axios.delete("http://localhost:3030/alunos/"+idAluno);
      navigate("../turmas/" + id + "/alunos");
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <EditPage
      buttonExcludeName="excluir aluno"
      buttonSaveFunction={handleSave}
      returnTo={"../turmas/" + id + "/alunos"}
      buttonExcludeFunction={handleExclude}
    >
      <Box>
        <TextField
          id="nome"
          label="Nome completo"
          value={dataAluno[0]?.nome || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="matricula"
          label="Matricula"
          value={dataAluno[0]?.matricula || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="email"
          label="Email"
          value={dataAluno[0]?.email || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="sexo"
          label="Sexo"
          value={dataAluno[0]?.sexo || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="nascimento"
          label="Data de Nascimento"
          value={dataAluno[0]?.nascimento || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="cidade"
          label="Cidade"
          value={dataAluno[0]?.cidade || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="uf"
          label="UF"
          value={dataAluno[0]?.uf || ""}
          onChange={handleInputChange}
        />
        <TextField
          id="interno"
          label="Interno"
          value={dataAluno[0]?.interno || ""}
          onChange={handleInputChange}
        />
      </Box>
    </EditPage>
  );
};

export default EditAluno;
