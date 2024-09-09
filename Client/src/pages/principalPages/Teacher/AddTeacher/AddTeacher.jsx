import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useState } from "react";
import { TextField } from "@mui/material";


// TODO: terminar a inserção de professores com senha aleatória enviada por email !!

const AddTeacher = () => {
    const [teacherData, setTeacherData] = useState({
        nome: '',
        email: '',
        siape: null
    })

    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
    
        if (name === "nome") {
          formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""); // Remove caracteres inválidos
        }
    
        try {
          setTeacherData((prevState) => ({
            ...prevState[0],
            [name]: formattedValue,
          }));
        } catch (error) {
          throw new Error(error);
        }
      };

  return (
    <CreatePage Title={"Docente"}>
      <TextField
        id="teacherName"
        name="nome"
        label="Nome do Docente"
        value={teacherData?.nome || ""}
        onChange={handleInputsChange}

      />
      <TextField
        id="teacherEmail"
        name="email"
        label="Email do Docente"
        value={teacherData?.email || ""}
        onChange={handleInputsChange}

      />
      <TextField
        id="teacherSIAPE"
        name="siape"
        label="SIAPE do Docente"
        value={teacherData?.siape || ""}
        onChange={handleInputsChange}

      />
    </CreatePage>
  );
};

export default AddTeacher;
