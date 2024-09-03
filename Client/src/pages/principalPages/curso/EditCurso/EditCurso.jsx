import EditPage from "../../../../components/createAndEditPages/EditPage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

const EditCurso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataCurso, setDataCurso] = useState({ nomeCurso: "", padrao: null });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setDataCurso((prevState) => {
      const updatedCurso = { ...prevState[0], [id]: value };
      return [updatedCurso];
    });
  };

  const saveAndRedirect = async () => {
    await axios
      .put(`http://localhost:3030/cursos/${id}`, {
        nome: dataCurso[0]?.nomeCurso,
        padrao: dataCurso[0]?.padrao,
      })
      .then((response) => {
        console.log(response);
        navigate("/cursos");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:3030/cursos/${id}`)
      .then((response) => {
        console.log(response);
        navigate("/cursos");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <EditPage
      title="Editar Curso"
      buttonSaveFunction={saveAndRedirect}
      buttonExcludeFunction={handleDelete}
      buttonExcludeName="Excluir Curso"
      returnTo="/cursos"
    >
      <TextField
        id="nomeCurso"
        label="Nome"
        value={dataCurso[0]?.nomeCurso}
        onChange={handleInput}
      />
      <TextField
        id="padrao"
        label="Padrão de nome de turma"
        value={dataCurso[0]?.padrao}
        onChange={handleInput}
      />
    </EditPage>
  );
};

export default EditCurso;
