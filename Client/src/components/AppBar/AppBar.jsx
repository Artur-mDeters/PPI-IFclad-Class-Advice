/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./AppBar.css";
import NavigationBar from "../UI/navigationBar/NavigationBar.jsx";
import logo from "../../assets/logoIF.png";
import dataButtons from "./dataButtons.jsx";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Theme from "../../theme.jsx";
import { jwtDecode } from "jwt-decode";

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
    overflowX: "hidden",
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
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  },
}));

export default function UiAppBar({ children, title }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const [mouseOver, setMouseOver] = React.useState(true);
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || "Usuário");
      } catch (error) {
        console.error("Erro ao decodificar o token", error);
        localStorage.removeItem("token");
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleOpen = (page) => {
    navigate("/");
    navigate(page);
  };

  const typographyButtonStyle = {
    marginLeft: "25px",
  };

  return (
    <Theme>
      <Box sx={{ display: "flex" }}>
        <Drawer variant="permanent" open={open || mouseOver}>
          <List component="nav" sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box className="AppBoxLogo" onClick={() => navigate("/")}> 
              <img src={logo} alt="IF" className="imglogo" />
              <Typography variant="h6" color="white" sx={{ typographyButtonStyle, marginLeft: "52px" }}>
                Clad - Class Advice
              </Typography>
            </Box>

            <Box className="AppBox">
              {dataButtons.map((button) => (
                <Box className={"ButtonBox "} onClick={() => handleOpen(button.page)} key={button.id} color="white">
                  {button.icon}
                  <Typography variant="h6" color="white" sx={typographyButtonStyle}>
                    {button.title}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider />

            <Box className="UserBox">
              <Box className="ButtonBox" onClick={() => handleOpen("conta")} color="white">
                <PersonIcon fontSize="large" />
                <Typography variant="h6" color="white" sx={typographyButtonStyle}>
                  Minha Conta
                </Typography>
              </Box>
              <Box className="ButtonBox" onClick={() => handleOpen("config")} color="white">
                <SettingsIcon fontSize="large" />
                <Typography variant="h6" color="white" sx={typographyButtonStyle}>
                  Configurações
                </Typography>
              </Box>
            </Box>
          </List>
        </Drawer>
        <AppBar position="absolute" open={open}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ paddingLeft: "10px", flex: 1, flexDirection: "row", display: "flex", alignItems: "center" }}>
              <NavigationBar />
              <Typography sx={{ marginLeft: "10px" }} variant="h3">{title}</Typography>
            </Box>
            <Box>
              <Toolbar sx={{ pr: "24px", justifyContent: "flex-end" }}>
                <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                  <Avatar />
                  <Typography variant="h6" color="white">{userName}</Typography>
                </Stack>
              </Toolbar>
            </Box>
          </Box>
        </AppBar>
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: "100vh", overflow: "auto", padding: "90px 20px 20px 20px" }}>
          {children}
        </Box>
      </Box>
    </Theme>
  );
}