import axios from "axios";

const getTeacher = async () => {
    const response = await axios.get('http://localhost:3030/professores/')
    try {
        return response.data
    } catch (error) {
        throw new Error(error);
    }
}

export default getTeacher
