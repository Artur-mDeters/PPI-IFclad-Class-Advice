import CreatePage from "../../../../components/createAndEditPages/CreatePage"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const CreateCourse = () => {
    const navigate = useNavigate()
    const [courseData, setCourseData] = useState([]);

    const handleInputChange = (e) => {
      const {id, value} = e.target;
      try {
        setCourseData((prevState) => {
          const inputsChange = { ...prevState[0], [id]: value}
          return [inputsChange]
        })
      } catch (err) {
        console.error(err)
      }
    }

    const saveAndRedirect = async () => {
        await axios.post('http://localhost:3030/cursos', {
            nome: courseData[0]?.courseName,
            padrao: courseData[0]?.pattern,
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
        id="courseName"
        label="Nome"
        value={courseData[0]?.courseName}
        onChange={handleInputChange}
        
      />
      <TextField
        id="pattern"
        label="Padrão de nome de turma"
        value={courseData[0]?.pattern}
        onChange={handleInputChange}  
      />
      <Typography variant="body1" textAlign="center">O padrão de nome de turma segue o formato T+(número do período)+(número do curso), onde o último número identifica o curso técnico. Insira o número que corresponde ao curso!</Typography>
    </CreatePage> 
  )
}

export default CreateCourse
