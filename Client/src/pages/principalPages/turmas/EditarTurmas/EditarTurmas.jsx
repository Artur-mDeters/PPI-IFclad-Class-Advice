import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditPage from "../../../../components/createAndEditPages/EditPage";

const getDataCursos = async () => {
  const response = await axios.get("http://localhost:3030/cursos");

  try {
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line react-hooks/exhaustive-deps

const EditarTurmas = () => {
  const [dataCurso, setDataCurso] = useState([]);
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [curso, setCurso] = useState("");

  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete("http://localhost:3030/turmas/" + id)
      .then((response) => {
        console.log(response);
        navigate("/turmas");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveAndRedirect = async () => {
    await axios
      .put("http://localhost:3030/turmas/editar/" + id, {
        nome: nome,
        ano_inicio: ano,
        curso: curso,
      })
      .then((response) => {
        console.log(response);
        navigate("/turmas");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleNome = (e) => {
    const value = e.target.value;

    setNome(value);
  };
  const handleAno = (e) => {
    const value = e.target.value;
    console.log(value);
    setAno(value);
  };
  const handleCurso = (e) => {
    const value = e.target.value;
    console.log(value);
    setCurso(value);
  };

  useEffect(() => {
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
  }, []);

  return (
    <EditPage
      title="Editar Turma"
      buttonSaveFunction={saveAndRedirect}
      buttonExcludeFunction={handleDelete}
      buttonExcludeName="Excluir Turma"
      returnTo='/turmas'
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Nome</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="nome"
          label="Nome"
          onChange={handleNome}
          value={nome}
        >
          <MenuItem value={"T11"}>T11</MenuItem>
          <MenuItem value={"T12"}>T12</MenuItem>
          <MenuItem value={"T13"}>T13</MenuItem>
          <MenuItem value={"T14"}>T14</MenuItem>
          <MenuItem value={"T15"}>T15</MenuItem>
          <MenuItem value={"T21"}>T21</MenuItem>
          <MenuItem value={"T22"}>T22</MenuItem>
          <MenuItem value={"T23"}>T23</MenuItem>
          <MenuItem value={"T24"}>T24</MenuItem>
          <MenuItem value={"T25"}>T25</MenuItem>
          <MenuItem value={"T31"}>T31</MenuItem>
          <MenuItem value={"T32"}>T32</MenuItem>
          <MenuItem value={"T33"}>T33</MenuItem>
          <MenuItem value={"T34"}>T34</MenuItem>
          <MenuItem value={"T35"}>T35</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="ano">Ano de Início</InputLabel>
        <Select
          labelId="ano"
          label="Ano de Início"
          id="ano_inicio"
          onChange={handleAno}
          value={ano}
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
      <FormControl>
        <InputLabel id="curso">Curso</InputLabel>
        <Select
          labelId="curso"
          label="Curso"
          id="curso"
          onChange={handleCurso}
          value={curso}
        >
          {/* map dos cursos */}
          {dataCurso.map((curso) => (
            <MenuItem key={curso.id_curso} value={curso.id_curso}>
              {curso.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </EditPage>
  );
};

// ‎ Caractere invisível
export default EditarTurmas;
