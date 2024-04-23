import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx'
import Home from './pages/home/Home.jsx'
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
  // {
  //   path: '/turmas',
  //   element: <Turmas />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: '/config',
  //   element: <Configuracoes />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: '/curso',
  //   element: <Curso />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: '/disciplinas',
  //   element: <Disciplinas />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: '/minha-conta',
  //   element: <MinhaConta />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: '/mostra-de-ciencias',
  //   element: <Mostra />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: '/professores',
  //   element: <Professores />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: '/setores',
  //   element: <Setores />,
  //   errorElement: <ErrorPage />
  // },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>,
)
