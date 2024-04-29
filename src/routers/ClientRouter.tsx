import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HelloWorld from "../components/HelloWorld";
import Home from "../components/Home";
import { Fab, ThemeProvider, createTheme } from "@mui/material";
import NavBar from "../components/NavBar";
import { green } from "@mui/material/colors";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ServiciosPage from "../components/ServiciosPage";
import ContactosPage from "../components/ContactosPage";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "judson",
    },
  },
  palette: {
    black: {
      main: "#000000",
    },
    yellow: {
      main: "#ffd700",
    },
    darkgrey: {
      main: "#5a5a5a",
    },
    grey: {
      main: "#d9d9d9",
    },
    white: {
      main: "#ffffff",
    },
    green: {
      main: "#5cd000",
    },
  },
});

const ClientRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="">
        <NavBar />
        <HelloWorld>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<ServiciosPage />} />
            <Route path="/contactos" element={<ContactosPage />} />
          </Routes>
          <Fab
            size="large"
            sx={{
              position: "fixed",
              bottom: theme.spacing(4),
              right: theme.spacing(4),
              color: "common.white",
              bgcolor: green[500],
              "&:hover": {
                bgcolor: green[600],
              },
            }}
            color="primary"
            aria-label="add"
          >
            <WhatsAppIcon
              style={{
                width: "70%",
                height: "70%",
              }}
            />
          </Fab>
        </HelloWorld>
      </div>
    </ThemeProvider>
  );
};

export default ClientRouter;
