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
import ReceiptHistoryPage from "../pages/BoletasHistoryPage";
import VehicleListPage from "../pages/VehicleList";
import ReportOnePage from "../pages/ReportOnePage";
import ReportTwoPage from "../pages/ReportTwoPage";

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
        <>
          <NavBarVariantPos />
          <Routes>
            // TODO: Implementar boletas como tabla
            <Route path="/boletas/" element={<ReceiptHistoryPage />} />
            <Route path="/boletas/:id" element={<BoletaPage />} />
            <Route path="/vehiculo/" element={<VehicleListPage />} />
            <Route path="/vehiculo/:patente" element={<VehiclePage />} />
            <Route path="/bonos/" element={<BonosPage />} />
            <Route path="/reporte/1" element={<ReportOnePage />} />
            <Route path="/reporte/2" element={<ReportTwoPage />} />

            <Route path="/" element={<PosPage />} />
          </Routes>
        </>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default PosRouter;
