import './index.css'
import ErrorPage from './pages/error/ErrorPage.jsx'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import Curso from './pages/principalPages/curso/Curso.jsx'
import Configuracoes from './pages/principalPages/config/Configuracoes.jsx'
import Disciplinas from './pages/principalPages/disciplinas/Disciplinas.jsx'
import MinhaConta from './pages/principalPages/minha-conta/MinhaConta.jsx'
import Mostra from './pages/principalPages/mostra-de-ciencias/Mostra.jsx'
import Professores from './pages/principalPages/professores/Professores.jsx'
import Setores from './pages/principalPages/Setores/Setores.jsx'
import Turmas from './pages/principalPages/turmas/Turmas.jsx'
import EditarTurmas from './pages/principalPages/turmas/EditarTurmas/EditarTurmas.jsx'
import CreateTurmas from './pages/principalPages/turmas/CreateTurmas/CreateTurmas.jsx'


const route = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cursos",
    element: <Curso />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/config",
    element: <Configuracoes />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/disciplinas",
    element: <Disciplinas />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/minha-conta",
    element: <MinhaConta />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mostra",
    element: <Mostra />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setores",
    element: <Setores />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/professores",
    element: <Professores />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas",
    element: <Turmas />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/editar/:id",
    element: <EditarTurmas />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/create",
    element: <CreateTurmas />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
