import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { Alert } from "@mui/material";

const getDataCursos = async () => {
  try {
    const response = await axios.get("http://localhost:3030/cursos");
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const CreateTurmas = () => {
  const [dataCurso, setDataCurso] = useState([]);
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [curso, setCurso] = useState("");
  const [pattern, setPattern] = useState();

  const navigate = useNavigate();

  const setTypeCurso = () => {
    dataCurso.map((data) => {
      if (data.id_curso == curso) {
        setPattern(data.padrao);
      }
    });
  };

  const saveAndRedirect = async () => {
    await axios
      .post("http://localhost:3030/turmas/", {
        nome,
        ano_inicio: ano,
        curso,
      })
      .then((response) => {
        console.log(response);
        setDataCurso("");
        navigate("/turmas");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleNome = (e) => setNome(e.target.value);
  const handleAno = (e) => setAno(e.target.value);
  const handleCurso = async (e) => {
    await setCurso(e.target.value);
  };

  useEffect(() => {
    console.log(pattern);
    const fetchData = async () => {
      try {
        const result = await getDataCursos();
        console.log(result);
        setDataCurso(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    setTypeCurso();
  }, [curso]);

  return (
    <CreatePage
      title="Criar Turma"
      buttonSaveFunction={saveAndRedirect}
      returnTo="/turmas"
    >
      <FormControl fullWidth>
        <InputLabel id="ano-label">Ano de Início</InputLabel>
        <Select
          labelId="ano-label"
          id="ano_inicio"
          label="Ano de Início"
          onChange={handleAno}
          value={ano}
        >
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((anoInicio) => (
            <MenuItem key={anoInicio} value={anoInicio}>
              {anoInicio}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="curso-label">Curso</InputLabel>
        <Select
          labelId="curso-label"
          id="curso"
          label="Curso"
          onChange={handleCurso}
          value={curso}
        >
          {dataCurso.map((curso) => (
            <MenuItem key={curso.id_curso} value={curso.id_curso}>
              {curso.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="nome-label">Nome</InputLabel>
        <Select
          labelId="nome-label"
          id="nome"
          label="Nome"
          onChange={handleNome}
          value={nome}
        >
          {pattern != undefined
            ? [1, 2, 3].map((nomeTurma) => (
                <MenuItem
                  key={nomeTurma}
                  value={"T" + nomeTurma + dataCurso[0]?.padrao}
                >
                  T{nomeTurma}
                  {pattern}
                </MenuItem>
              ))
            : [0].map((a) => (
                <Alert severity="error" key={a}>
                  Escolha um curso!
                </Alert>
              ))}
        </Select>
      </FormControl>
    </CreatePage>
  );
};

export default CreateTurmas;
