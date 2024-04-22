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


const renderizar = (cond) => {
  if (cond == "turmas") return <Turmas/>
  else if (cond == "professores") return <Professores />
  else if (cond == "config") return <Configuracoes />
  else if (cond == "curso") return <Curso />
  else if (cond == "dis") return <Disciplinas />
  else if (cond == "prof") return <MinhaConta />
  else if (cond == "mostra") return <Mostra />
  else if (cond == "setores") return <Setores />
}

const Home = () => {

  return (
    <div>
        <ThemeProvider theme={defaultDark}>
          <CssBaseline />
          <AppBar>
            {renderizar('')}
          </AppBar>
        </ThemeProvider>
    </div>
  )
}

export default Home