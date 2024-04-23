import { CssBaseline, ThemeProvider, Button, Typography, Container} from '@mui/material'
import { defaultDark } from '../../themes/themes'
import AppBar  from '../../components/AppBar/AppBar'
import Configuracoes from '../../components/config/Configuracoes.jsx'
import Curso from '../../components/curso/Curso.jsx'
import Disciplinas from '../../components/disciplinas/Disciplinas.jsx'
import MinhaConta from '../../components/minha-conta/MinhaConta.jsx'
import Mostra from '../../components/mostra-de-ciencias/Mostra.jsx'
import Professores from '../../components/professores/Professores.jsx'
import Setores from '../../components/Setores/Setores.jsx'
import Turmas from '../../components/turmas/Turmas.jsx'
import { useState } from 'react'

const render = (cond) => {
  if (cond == "turmas") return <Turmas/>
  else if (cond == "professores") return <Professores />
  else if (cond == "config") return <Configuracoes />
  else if (cond == "cursos") return <Curso />
  else if (cond == "disciplinas") return <Disciplinas />
  else if (cond == "mostra") return <Mostra />
  else if (cond == "setores") return <Setores />
  else if (cond == "conta") return <MinhaConta />
}

const Home = () => {
  const [page, setPage] = useState(null)
  
  const handlePage = (data) => {
    setPage(data)
  }


  return (
    <div>
        <ThemeProvider theme={defaultDark}>
          <CssBaseline />
          <AppBar page={handlePage}>
            {render(page)}
          </AppBar>
        </ThemeProvider>
    </div>
  )
}

export default Home