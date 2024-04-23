import React from 'react'
import SearchBar from '../UI/SearchBar/SearchBar'
import { Button, Box } from '@mui/material'


const Professores = () => {
  return (
    <Box>
      <SearchBar>
        <Button variant="contained">Adicionar Professor</Button>
      </SearchBar>
    </Box>
  )
}

export default Professores