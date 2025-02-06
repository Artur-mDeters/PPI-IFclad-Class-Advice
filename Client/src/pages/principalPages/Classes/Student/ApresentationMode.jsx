import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UiAppBar from "../../../../components/AppBar/AppBar";
import { Box, Typography, Paper, Grid, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import padrao from "./fotos/padrao.png";

const ApresentationMode = () => {
  const location = useLocation();
  const selectedStudents = location.state?.selectedStudents || [];
  const [studentsData, setStudentsData] = useState(null);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const studentsData = [];
      
        for (const studentId of selectedStudents) {
          const response = await axios.get(
            `http://localhost:3030/apresentation/${studentId}`
          );
      
          console.log(response);
      
          // Organizando os dados recebidos
          if (response.data && response.data.length > 0) {
            const firstRow = response.data[0];
            const formattedData = {
              id_aluno: firstRow.id_aluno,
              nome: firstRow.nome,
              matricula: firstRow.matricula,
              foto_path: firstRow.foto_path,
              interno: firstRow.interno,
              turma: firstRow.nome_turma,
              curso: firstRow.nome_curso,
              faltas: firstRow.faltas,
              observacao: firstRow.observacao,
              cidade: firstRow.cidade,
              uf: firstRow.uf,
              reprovou: firstRow.reprovou,
              genero: firstRow.genero,
              nascimento: firstRow.nascimento,
              grades: response.data.map(row => ({
                id_disciplina: row.id_disciplina,
                nome_disciplina: row.nome_disciplina,
                parcial1: row.parcial1,
                semestre1: row.semestre1,
                parcial2: row.parcial2,
                semestre2: row.semestre2,
                ais_b10: row.ais_b10,
                ppi_b10: row.ppi_b10,
                mostra_de_ciencias: row.mostra_de_ciencias,
                nota_final: row.nota_final
              }))
            };
            console.log(formattedData);
            studentsData.push(formattedData);
          }
        }
      
        setStudentsData(studentsData);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (selectedStudents.length > 0) {
      fetchStudentsData();
    }
  }, [selectedStudents]);
  
  if (!studentsData) {
    return (
      <UiAppBar title="Modo Apresentação">
        <Box sx={{ padding: 3 }}>
          <Typography>Carregando...</Typography>
        </Box>
      </UiAppBar>
    );
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
                  <Typography variant="body1" color="gray">
                    Turma: {student.turma}
                  </Typography>
                  <Typography variant="body1" color="gray">
                    Curso: {student.curso}
                  </Typography>
                  <Typography variant="body1" color="gray">
                    Interno: {student.interno}
                  </Typography>
                  <Typography variant="body1" color="gray">
                    Observação: {student.observacao}
                  </Typography>
                  <Typography variant="body1" color="gray">
                    Reside em: {student.cidade + " / " + student.uf}
                  </Typography>
                  <Typography variant="body1" color="gray">
                    Reprovou: {student.reprovou}
                  </Typography>
                  <Typography variant="body1" color="gray">
                    Gênero: {student.genero}
                  </Typography>
                  <Typography variant="body1" color="gray">
                    Data de Nascimento: {student.nascimento}
                  </Typography>
                </Box>
              </Grid>

              {/* Nova estrutura de tabela para as notas */}
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Notas
                </Typography>
                <Divider sx={{ backgroundColor: 'gray', mb: 2 }} />
                
                <TableContainer component={Paper} sx={{ backgroundColor: '#2d2d2d' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell 
                          sx={{ 
                            color: 'white', 
                            fontWeight: 'bold',
                            backgroundColor: '#1a1a1a',
                            width: '40%'
                          }}
                        >
                          Disciplina
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            width: '12%'
                          }}
                        >
                          Parcial 1
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            width: '12%'
                          }}
                        >
                          Semestre 1
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            width: '12%'
                          }}
                        >
                          Parcial 2
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            width: '12%'
                          }}
                        >
                          Semestre 2
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            width: '12%'
                          }}
                        >
                          MC
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            width: '12%'
                          }}
                        >
                          AIS
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            width: '12%'
                          }}
                        >
                          PPI
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: '#1a1a1a',
                            fontWeight: 'bold',
                            width: '12%'
                          }}
                        >
                          Nota Final
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {student.grades?.map((grade, index) => (
                        <TableRow 
                          key={index}
                          sx={{ 
                            '&:nth-of-type(odd)': { 
                              backgroundColor: '#262626' 
                            }
                          }}
                        >
                          <TableCell 
                            component="th" 
                            scope="row"
                            sx={{ 
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          >
                            {grade.nome_disciplina}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ color: 'white' }}
                          >
                            {grade.parcial1 || '-'}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ color: 'white' }}
                          >
                            {grade.semestre1 || '-'}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ color: 'white' }}
                          >
                            {grade.parcial2 || '-'}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ color: 'white' }}
                          >
                            {grade.semestre2 || '-'}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ 
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          >
                            {grade.mostra_de_ciencias || '-'}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ 
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          >
                            {grade.ais_b10 || '-'}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ 
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          >
                            {grade.ppi_b10 || '-'}
                          </TableCell>
                          <TableCell 
                            align="center"
                            sx={{ 
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          >
                            {grade.nota_final || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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