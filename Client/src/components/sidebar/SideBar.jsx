import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import { defaultDark } from "../../themes/themes";

// icons
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import BiotechIcon from "@mui/icons-material/Biotech";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 265;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
    background: `linear-gradient(45deg, #5c1c8a ,#5d1c8b ,#20155f)`, // Gradiente linear roxo
  },
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [mouseOver, setMouseOver] = React.useState(false);

  // Estilos

  const boxButtonStyle = {
    display: "flex",
    alignItems: "center",
    height: "55px",
    cursor: "pointer",
    paddingLeft: "15px",
    marginBottom: "5px",
  };

  const typographyButtonStyle = {
    marginLeft: "25px",
  };

  const handleMouseEnter = () => {
    setMouseOver(true);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultDark}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={open || mouseOver}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          ></Toolbar>
          <Divider />
          <List component="nav"  >
            <Box sx={{
            }}> 
              {/* // ! Lista de Abas */}
              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <GraphicEqIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Turmas
                </Typography>
              </Box>

              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <SchoolIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Cursos
                </Typography>
              </Box>

              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <GroupIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Professores
                </Typography>
              </Box>

              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <AutoStoriesIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Disciplinas
                </Typography>
              </Box>

              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <LocalLibraryIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Alunos
                </Typography>
              </Box>

              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <DonutSmallIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Setores
                </Typography>
              </Box>

              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <BiotechIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Mostra de Ciências
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box sx={{}}>
              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <PersonIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Minha Conta
                </Typography>
              </Box>

              <Box sx={boxButtonStyle}>
                {/* Icone  */}
                <SettingsIcon fontSize="large" />
                {/* label  */}
                <Typography variant="h6" sx={typographyButtonStyle}>
                  Configurações
                </Typography>
              </Box>
            </Box>
          </List>
        </Drawer>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          ></Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
