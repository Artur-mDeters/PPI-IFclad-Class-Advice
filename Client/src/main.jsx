import './index.css'
import ErrorPage from './pages/error/ErrorPage.jsx'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from '../src/pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import RecoverPassword from './pages/login/recoverPassword/RecoverPassword.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'

//* Courses pages imports
import Course from './pages/principalPages/Course/CoursePage.jsx'
import CreateCourse from './pages/principalPages/Course/CreateCourse/CreateCourse.jsx'
import EditCourse from './pages/principalPages/Course/EditCourse/EditCourse.jsx'

//* Teachers pages imports
import TeacherPage from './pages/principalPages/Teacher/TeacherPage.jsx'
import TeacherByIDPage from './pages/principalPages/Teacher/teacherByID/TeacherByIDPage.jsx'
import AddTeacher from './pages/principalPages/Teacher/AddTeacher/AddTeacher.jsx'

//* Student pages imports
import StudentPage from "./pages/principalPages/Classes/Student/StudentPage.jsx"
import AddStudentPage from './pages/principalPages/Classes/Student/AddStudent/AddStudentPage.jsx'
import EditStudentPage from './pages/principalPages/Classes/Student/EditStudent/EditStudentPage.jsx'
import AllStudentGradesPage from './pages/principalPages/Classes/AllStudentGrades/AllStudentGradesPage.jsx'

//* Classes imports
import ClassesPage from './pages/principalPages/Classes/ClassesPage.jsx'
import CreateClassesPage from './pages/principalPages/Classes/CreateClasses/CreateClassesPage.jsx'
import EditClassesPage from './pages/principalPages/Classes/EditClasses/EditClassesPage.jsx'

//* Subjects Imports
import SubjectPage from './pages/principalPages/Subject/SubjectPage.jsx'
import CreateSubjectPage from './pages/principalPages/Subject/CreateSubject/CreateSubjectPage.jsx'
import EditSubjectPage from './pages/principalPages/Subject/EditSubject/EditSubjectPage.jsx'

//* Sectors imports
import SectorsPage from './pages/principalPages/Sectors/SectorsPage.jsx'
import AddSectors from './pages/principalPages/Sectors/AddSectors/AddSectors.jsx'
import EditSector from './pages/principalPages/Sectors/EditSectors/EditSector.jsx'

//* imports from other pages
import MyAccountPage from './pages/principalPages/MyAccount/MyAccountPage.jsx'
import ScienceShowPage from './pages/principalPages/ScienceShow/ScienceShowPage.jsx' 
import Settings from './pages/principalPages/config/Configuracoes.jsx'
import StudentGradesPage from './pages/principalPages/Classes/Student/StudentGrades/StudentGradesPage.jsx'
import PDFgrades from './pages/principalPages/Classes/pareceres/PDFgrades.jsx'
import ApresentationMode from './pages/principalPages/Classes/Student/ApresentationMode.jsx'




const route = createBrowserRouter([
  //! routes from other pages
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/apresentacao",
    element: <ApresentationMode />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recover-password/:id",
    element: <RecoverPassword />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/",
    element: <PrivateRoute><Home /></PrivateRoute>,
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

  // ! Student grades pages
  {
    path: "/:id/notas", 
    element: <StudentGradesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:idTurma/notasTurma/",
    element: <AllStudentGradesPage />,
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
    path: "/professores/create",
    element: <AddTeacher />,
    errorElement: <ErrorPage />,
  },
  // ! Subjects page routes
  {
    path: "/disciplinas",
    element: <SubjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/disciplinas/create",
    element: <CreateSubjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/disciplinas/edit/:id",
    element: <EditSubjectPage />,
    errorElement: <ErrorPage />,
  },

  //! Sectors page routes
  {
    path: "/setores",
    element: <SectorsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setores/create",
    element: <AddSectors />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setores/edit/:id",
    element: <EditSector />,
    errorElement: <ErrorPage />,
  },

  // ! PDF grades page
  {
    path: "/:idTurma/pareceres",
    element: <PDFgrades />,
    errorElement: <ErrorPage />,
  },
  // ! Other pages
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
    path: "/config",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
