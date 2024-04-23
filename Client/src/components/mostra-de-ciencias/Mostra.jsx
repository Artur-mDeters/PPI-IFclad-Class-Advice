import { Box, Button } from '@mui/material'
import SearchBar from '../UI/SearchBar/SearchBar'
import React from 'react'

const Mostra = () => {
  return (
    <Box>
      <SearchBar>
        <Button variant="contained">
          Adicionar Grupo
        </Button>
      </SearchBar>
    </Box>
  )
}

export default Mostra