import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import BiotechIcon from "@mui/icons-material/Biotech";

const dataButtons = [
    {
        id: 1,
        title: "Turmas",
        page: "/turmas",
        icon: <GraphicEqIcon fontSize='large'/>,
    },
    {
        id: 2,
        title: "Cursos",
        page: '/cursos',
        icon: <SchoolIcon fontSize="large" />,
    },
    {
        id: 3,
        title: "Docentes",
        page: '/professores',
        icon: <GroupIcon fontSize="large" />,
    },
    {
        id: 4,
        title: 'Disciplinas',
        page: '/disciplinas',
        icon: <AutoStoriesIcon fontSize="large" />,
    },
    {
        id: 5,
        title: 'Setores',
        page: '/setores',
        icon: <DonutSmallIcon fontSize="large" />,
    },
    {
        id: 6,
        title: 'Mostra de Ciencias',
        page: '/mostra',
        icon: <BiotechIcon fontSize="large" />,
    },
]
export default dataButtons