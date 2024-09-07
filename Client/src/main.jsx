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
import TeacherPage from './pages/principalPages/Teacher/TeacherPage.jsx'
import TeacherByIDPage from './pages/principalPages/Teacher/teacherByID/TeacherByIDPage.jsx'

//* Student pages imports
import StudentPage from "./pages/principalPages/Classes/Student/StudentPage.jsx"
import AddStudentPage from './pages/principalPages/Classes/Student/AddStudent/AddStudentPage.jsx'
import EditStudentPage from './pages/principalPages/Classes/Student/EditStudent/EditStudentPage.jsx'

//* Classes imports
import ClassesPage from './pages/principalPages/Classes/ClassesPage.jsx'
import CreateClassesPage from './pages/principalPages/Classes/CreateClasses/CreateClassesPage.jsx'
import EditClassesPage from './pages/principalPages/Classes/EditClasses/EditClassesPage.jsx'

//* school discipline
import SubjectPage from './pages/principalPages/Subject/SubjectPage.jsx'

//* imports from other pages
import MyAccountPage from './pages/principalPages/MyAccount/MyAccountPage.jsx'
import ScienceShowPage from './pages/principalPages/ScienceShow/ScienceShowPage.jsx' 
import SectorsPage from './pages/principalPages/Sectors/SectorsPage.jsx'




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
    element: <StudentPage/>, 
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/:idTurma/alunos/AddAlunos/",
    element: <AddStudentPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/:id/alunos/EditAluno/:idAluno",
    element: <EditStudentPage/>,
    errorElement: <ErrorPage />,
  },

  //! Classes page routes
  {
    path: "/turmas",
    element: <ClassesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/editar/:id",
    element: <EditClassesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/turmas/create",
    element: <CreateClassesPage />,
    errorElement: <ErrorPage />,
  },

  //! Teachers page routes
  {
    path: "/professores",
    element: <TeacherPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/professores/:id",
    element: <TeacherByIDPage />,
    errorElement: <ErrorPage />,
  },
  
  {
    path: "/disciplinas",
    element: <SubjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/minha-conta",
    element: <MyAccountPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mostra",
    element: <ScienceShowPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setores",
    element: <SectorsPage />,
    errorElement: <ErrorPage />,
  },
  

  
  

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
