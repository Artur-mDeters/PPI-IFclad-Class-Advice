import EditPage from "../../../../components/createAndEditPages/EditPage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

const EditCurso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataCurso, setDataCurso] = useState({ nomeCurso: "", padrao: "" });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setDataCurso((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const saveAndRedirect = async () => {
    console.log(dataCurso)
    try {
      const response = await axios.put("http://localhost:3030/cursos/edit/"+id , {
        nome: dataCurso.nomeCurso,
        padrao: dataCurso.padrao
      })
      console.log(response);
      navigate("/cursos");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3030/cursos/${id}`);
      console.log(response);
      navigate("/cursos");
    } catch (err) {
      console.error(err);
    }
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
        value={dataCurso.nomeCurso}
        onChange={handleInput}
      />
      <TextField
        id="padrao"
        label="Padrão de nome de turma"
        value={dataCurso.padrao}
        onChange={handleInput}
      />
    </EditPage>
  );
};

export default EditCurso;
