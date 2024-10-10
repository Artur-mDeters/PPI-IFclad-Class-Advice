
import axios from "axios";

const GetDataTurmasById = async (id) => {
    const response = await axios.get('http://localhost:3030/turmas/'+id)
    try {
        return response.data;
    } catch (error) {
        console.error(error)
    }
}


export default GetDataTurmasById