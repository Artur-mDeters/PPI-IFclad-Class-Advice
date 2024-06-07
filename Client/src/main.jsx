import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import EditTurmas from './pages/editTurmas/EditTurmas.jsx'
// import Configuracoes from './pages/config/Configuracoes.jsx'
// import Curso from './pages/curso/Curso.jsx'
// import Disciplinas from './pages/disciplinas/Disciplinas.jsx'
// import MinhaConta from './pages/minha-conta/MinhaConta.jsx'
// import Mostra from './pages/mostra-de-ciencias/Mostra.jsx'
// import Professores from './pages/professores/Professores.jsx'
// import Setores from './pages/Setores/Setores.jsx'
// import Turmas from './pages/turmas/Turmas.jsx'

const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage/>
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <Register/>,
    errorElement: <ErrorPage/>
  },
  { 
    path: '/edit',
    element: <EditTurmas/>,
    errorElement: <ErrorPage/>
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>,
)
