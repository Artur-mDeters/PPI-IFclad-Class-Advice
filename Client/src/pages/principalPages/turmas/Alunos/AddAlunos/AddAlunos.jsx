// import { Box } from "@mui/material"
// import { Paper, TextField } from "@mui/material"
import { TableContainer, Table, TableHead, TableRow, TableCell, ThemeProvider, CssBaseline } from "@mui/material"
import { defaultDark } from "../../../../../themes/themes"

// TODO: inserção dos alunos na tabla por uma tabela
// TODO: Fazer a componentização dessa página 

const AddAlunos = () => {
  
  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <TableContainer>
        <Table sx={{minWidth: 650}}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome Completo</TableCell>
            <TableCell align="center">Idade</TableCell>
            <TableCell align="center">Sexo</TableCell>
            <TableCell align="center">Porn</TableCell>
            <TableCell align="center">Ola que legal</TableCell>
          </TableRow> 
        </TableHead>
        </Table>
      </TableContainer>
      </ThemeProvider>
  )
}

export default AddAlunos
