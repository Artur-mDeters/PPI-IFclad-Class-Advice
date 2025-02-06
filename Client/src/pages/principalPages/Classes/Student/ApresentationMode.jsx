import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UiAppBar from "../../../../components/AppBar/AppBar";
import { Box, Typography, Paper, Grid, Avatar, Divider } from "@mui/material";
import axios from "axios";
import padrao from "./fotos/padrao.png";

const ApresentationMode = () => {
  const location = useLocation();
  const selectedStudents = location.state?.selectedStudents || [];
  const [studentsData, setStudentsData] = useState(null);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/apresentation/${selectedStudents[0]}`
        );

        console.log(response.data.rows)
        
        // Organizando os dados recebidos
        if (response.data && response.data.length > 0) {
          const firstRow = response.data[0];
          const formattedData = {
            id_aluno: firstRow.id_aluno,
            nome: firstRow.nome,
            matricula: firstRow.matricula,
            foto_path: firstRow.foto_path,
            grades: response.data.map(row => ({
              id_disciplina: row.id_disciplina,
              nome_disciplina: row.nome_disciplina,
              parcial1: row.parcial1,
              semestre1: row.semestre1,
              parcial2: row.parcial2,
              semestre2: row.semestre2,
              nota_final: row.nota_final
            }))
          };
          console.log(formattedData)
          setStudentsData([formattedData]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos alunos:", error);
      }
    };

    if (selectedStudents.length > 0) {
      fetchStudentsData();
    }
  }, [selectedStudents]);

  if (!studentsData) {
    return <UiAppBar title="Modo Apresentação">
      <Box sx={{ padding: 3 }}>
        <Typography>Carregando...</Typography>
      </Box>
    </UiAppBar>;
  }

  return (
    <UiAppBar title="Modo Apresentação">
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          {studentsData.map((student) => (
            <Grid item xs={12} key={student.id_aluno}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3,
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <Grid container spacing={2}>
                  {/* Informações do Aluno */}
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Avatar
                        src={
                          student.foto_path
                            ? `http://localhost:3030/fotos/${student.foto_path}`
                            : padrao
                        }
                        alt={student.nome}
                        sx={{
                          width: 200,
                          height: 200,
                          borderRadius: "5px",
                        }}
                      >
                        {!student.foto_path && student.nome?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h4" sx={{ mt: 2 }}>
                        {student.nome}
                      </Typography>
                      <Typography variant="body1" color="gray">
                        Matrícula: {student.matricula}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Notas do Aluno */}
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      Notas
                    </Typography>
                    <Divider sx={{ backgroundColor: 'gray', mb: 2 }} />
                    <Grid container spacing={2}>
                      {student.grades?.map((grade, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Paper 
                            sx={{ 
                              p: 2, 
                              backgroundColor: '#2d2d2d',
                              height: '100%'
                            }}
                          >
                            <Typography variant="h6" color="primary">
                              {grade.nome_disciplina}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body1">
                                Parcial 1: {grade.parcial1 || '-'}
                              </Typography>
                              <Typography variant="body1">
                                Semestre 1: {grade.semestre1 || '-'}
                              </Typography>
                              <Typography variant="body1">
                                Parcial 2: {grade.parcial2 || '-'}
                              </Typography>
                              <Typography variant="body1">
                                Semestre 2: {grade.semestre2 || '-'}
                              </Typography>
                              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                                Nota Final: {grade.nota_final || '-'}
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </UiAppBar>
  );
};

export default ApresentationMode; 