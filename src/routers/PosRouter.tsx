import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider, closeSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import NavBarVariantPos from "../components/NavBarVariantPos";
import PosPage from "../pages/PosPage";
import BoletaPage from "../pages/BoletaPage";
import VehiclePage from "../pages/VehiclePage";
import BonosPage from "../pages/BonosPage";
import Reporte1Page from "../pages/Reporte1Page";
import Reporte2Page from "../pages/Reporte2Page";
import Reporte3Page from "../pages/Reporte3Page";
import Reporte4Page from "../pages/Reporte4Page";
import ReceiptHistoryPage from "../pages/BoletasHistoryPage";

const actionar = (snackbarID) => (
  <React.Fragment>
    <IconButton
      sx={{ color: "white" }}
      onClick={() => closeSnackbar(snackbarID)}
    >
      <CloseIcon></CloseIcon>
    </IconButton>
  </React.Fragment>
);

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "judson",
    },
  },
});

const PosRouter = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3600} action={actionar}>
      <ThemeProvider theme={theme}>
        <div>
          <NavBarVariantPos />
          <Routes>
            <Route path="/boletas/" element={<ReceiptHistoryPage />} />
            <Route path="/boletas/:id" element={<BoletaPage />} />
            <Route path="/vehiculo/:id" element={<VehiclePage />} />
            <Route path="/bonos/" element={<BonosPage />} />
            <Route path="/reporte/1" element={<Reporte1Page />} />
            <Route path="/reporte/2" element={<Reporte2Page />} />
            <Route path="/reporte/3" element={<Reporte3Page />} />
            <Route path="/reporte/4" element={<Reporte4Page />} />
            <Route path="/" element={<PosPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default PosRouter;
