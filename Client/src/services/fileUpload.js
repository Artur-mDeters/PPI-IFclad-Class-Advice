import axios from 'axios';

export const saveImageLocally = async (file) => {
  if (!file) return null;
  
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('http://localhost:3030/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data.filePath;
  } catch (error) {
    console.error('Erro ao salvar imagem:', error);
    throw new Error('Falha ao fazer upload da imagem');
  }
}; 