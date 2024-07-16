import EditPage from "../../../../components/createAndEditPages/EditPage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

const EditCurso = () => {
  const [nome, setNome] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNome = (e) => setNome(e.target.value);

  const saveAndRedirect = async () => {
    await axios
      .put(`http://localhost:3030/cursos/edit/${id}`, {
        nome: nome,
      })
      .then((response) => {
        console.log(response);
        console.log(`http://localhost:3030/cursos/edit/${id}`);
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
      <TextField id="nome" label="Nome" value={nome} onChange={handleNome} />
    </EditPage>
  );
};

export default EditCurso;
