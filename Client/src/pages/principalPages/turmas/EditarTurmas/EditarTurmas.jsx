import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditPage from "../../../../components/createAndEditPages/EditPage";
import { Alert } from "@mui/material";

const getDataCursos = async () => {
  try {
    const response = await axios.get("http://localhost:3030/cursos");
    return response.data;
  } catch (err) {
    console.error(err);
    return []; // Retorna um array vazio em caso de erro
  }
};

const EditarTurmas = () => {
  const [dataCurso, setDataCurso] = useState([]);
  const [pattern, setPattern] = useState();
  const [dataTurma, setDataTurma] = useState({
    nome: "",
    ano: "",
    curso: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const setTypeCurso = () => {
    dataCurso.map((data) => {
      if (data.id_curso == dataTurma.curso) {
        setPattern(data.padrao);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataCursos();
        setDataCurso(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    setTypeCurso();
  }, [id, dataTurma.curso]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/turmas/${id}`);
      navigate("/turmas");
    } catch (err) {
      console.error(err);
    }
  };

  const saveAndRedirect = async () => {
    try {
      await axios.put(`http://localhost:3030/turmas/editar/${id}`, {
        nome: dataTurma?.nome,
        ano_inicio: dataTurma?.ano,
        curso: dataTurma?.curso,
      });
      navigate("/turmas");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInput = (e, alterThis) => {
    const { value } = e.target;
    setDataTurma((prevState) => ({
      ...prevState,
      [alterThis]: value,
    }));
    console.log(dataTurma, pattern);
  };

  return (
    <EditPage
      title="Editar Turma"
      buttonSaveFunction={saveAndRedirect}
      buttonExcludeFunction={handleDelete}
      buttonExcludeName="Excluir Turma"
      returnTo="/turmas"
    >
      <FormControl fullWidth>
        <InputLabel id="curso">Curso</InputLabel>
        <Select
          labelId="curso"
          id="curso"
          label="Curso"
          onChange={(e) => handleInput(e, "curso")}
          value={dataTurma.curso || ""}
        >
          {dataCurso.map((curso) => (
            <MenuItem key={curso.id_curso} value={curso.id_curso}>
              {curso.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="nome">Nome</InputLabel>
        <Select
          labelId="nome"
          id="nome"
          label="Nome"
          onChange={(e) => handleInput(e, "nome")}
          value={dataTurma.nome || ""}
        >
          {pattern != undefined
            ? [1, 2, 3].map((nomeTurma) => (
                <MenuItem key={nomeTurma} value={"T" + nomeTurma + pattern}>{"T" + nomeTurma + pattern}</MenuItem>
              ))
            : [0].map((a) => (
                <Alert severity="error" key={a}>
                  Escolha um curso!
                </Alert>
              ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="ano">Ano de Início</InputLabel>
        <Select
          labelId="ano"
          id="ano"
          label="Ano de Início"
          onChange={(e) => handleInput(e, "ano")}
          value={dataTurma.ano || ""}
        >
          <MenuItem value={2024}>2024</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
        </Select>
      </FormControl>
    </EditPage>
  );
};

export default EditarTurmas;
