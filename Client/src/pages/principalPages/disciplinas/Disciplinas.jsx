import { Box, Button } from '@mui/material'
import React from 'react'
import SearchBar from '../UI/SearchBar/SearchBar'

const Disciplinas = () => {
  return (
    <Box>
      <SearchBar>
        <Button variant="contained" >
          Adicionar Disciplina
        </Button>
      </SearchBar>
    </Box>
  )
}

export default Disciplinas