import './index.css'
import ErrorPage from './pages/error/ErrorPage.jsx'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'

//* Courses pages imports
import Course from './pages/principalPages/Course/CoursePage.jsx'
import CreateCourse from './pages/principalPages/Course/CreateCourse/CreateCourse.jsx'
import EditCourse from './pages/principalPages/Course/EditCourse/EditCourse.jsx'

//* Teachers pages imports
import Teacher from './pages/principalPages/Teacher/Teacher.jsx'
import TeacherByID from './pages/principalPages/Teacher/teacherByID/TeacherByID.jsx'

//* Student pages imports
import Alunos from './pages/principalPages/turmas/Alunos/Alunos.jsx'
import AddStudentPage from './pages/principalPages/turmas/Alunos/AddAlunos/AddStudentPage.jsx'
import EditAluno from './pages/principalPages/turmas/Alunos/EditAluno/EditAluno.jsx'

//* Classes imports
import Turmas from './pages/principalPages/turmas/Turmas.jsx'
import CreateTurmas from './pages/principalPages/turmas/CreateTurmas/CreateTurmas.jsx'

//* school discipline
import SubjectPage from './pages/principalPages/Subject/SubjectPage.jsx'

//* imports from other pages
import MinhaConta from './pages/principalPages/MyAccount/MyAccountPage.jsx'
import ScienceShowPage from './pages/principalPages/ScienceShow/CienceShowPage.jsx' 
import Setores from './pages/principalPages/Setores/Setores.jsx'
import EditarTurmas from './pages/principalPages/turmas/EditarTurmas/EditarTurmas.jsx'




const route = createBrowserRouter([
  //! routes from other pages
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
  //! Course page routes
  {
    path: "/cursos",
    element: <Course />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cursos/edit/:id",
    element: <EditCourse />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cursos/create",
    element: <CreateCourse />,
    errorElement: <ErrorPage />,
  },
  //! Student page routes 
  {
    path: "/turmas/:idTurma/alunos/",
    element: <Alunos/>, 
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/:idTurma/alunos/AddAlunos/",
    element: <AddStudentPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/:id/alunos/EditAluno/:idAluno",
    element: <EditAluno/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/disciplinas",
    element: <SubjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/minha-conta",
    element: <MinhaConta />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mostra",
    element: <ScienceShowPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setores",
    element: <Setores />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/professores",
    element: <Teacher />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/professores/:id",
    element: <TeacherByID />,
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
