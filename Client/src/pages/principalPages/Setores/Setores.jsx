import React from 'react'
import { Box, Button } from '@mui/material'
import SearchBar from '../../../components/UI/SearchBar/SearchBar.jsx'


const Setores = () => {
  return (
    <Box>
      <SearchBar>
        <Button variant='contained'>Adicionar Setor</Button>
      </SearchBar>
    </Box>
  )
}

export default Setores