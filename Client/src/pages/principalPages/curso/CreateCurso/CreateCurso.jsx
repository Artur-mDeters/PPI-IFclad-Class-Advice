import CreatePage from "../../../../components/createAndEditPages/CreatePage"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField'



const CreateCurso = () => {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState([]);


    const handleInput = (e) => {
      const {id, value} = e.target;
      try {
        setInputs((prevState) => {
          const inputsChange = { ...prevState[0], [id]: value}
          return [inputsChange]
        })
      } catch (err) {
        console.error(err)
      }
    }

    const saveAndRedirect = async () => {
        await axios.post('http://localhost:3030/cursos', {
            nome: inputs[0]?.nomeCurso,
            padrao: inputs[0]?.pad,
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
        id="nomeCurso"
        label="Nome"
        value={inputs[0]?.nomeCurso}
        onChange={handleInput}
        
      />
      <TextField
        id="pad"
        label="Padrão de nome de turma"
        value={inputs[0]?.pad}
        onChange={handleInput}
        
      />
    </CreatePage> 
  )
}

export default CreateCurso
