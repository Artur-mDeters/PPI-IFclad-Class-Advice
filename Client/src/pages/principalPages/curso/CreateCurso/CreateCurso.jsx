import CreatePage from "../../../../components/createAndEditPages/CreatePage"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import TextField from '@mui/material/TextField'



const CreateCurso = () => {

    const navigate = useNavigate()

    const [nome, setNome] = useState("");

    const handleNome = (e) => setNome(e.target.value)

    const saveAndRedirect = async () => {
        await axios.post('http://localhost:3030/cursos', {
            nome: nome
        }).then((response) => {
            console.log(response)
            navigate("/cursos")
        }).catch((err) => {
            console.error(err)
        })
    }
  return (
    <CreatePage title="Criar Novo Curso" buttonSaveFunction={saveAndRedirect} returnTo="/cursos">
        <TextField
          id="nome"
          label="Nome"
          value={nome}
          onChange={handleNome}
          
        />
    </CreatePage> 
  )
}

export default CreateCurso
