import { Box, Button } from '@mui/material'
import SearchBar from '../UI/SearchBar/SearchBar'

const Curso = () => {
  return (
    <Box>
      <SearchBar>
        <Button variant="contained">
          Adicionar Curso
        </Button>
      </SearchBar>
    </Box>
  )
}

export default Curso