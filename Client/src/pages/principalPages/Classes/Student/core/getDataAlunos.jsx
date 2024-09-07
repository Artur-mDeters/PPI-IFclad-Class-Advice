import axios from "axios"

const getDataAlunos = async () => {
  const response = await axios.get("http://localhost:3030/alunos")
  try {
    return response.data
  } catch(err) {
    console.error(err)
  }
}

export default getDataAlunos
