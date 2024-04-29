import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBarVariantWork from '../components/NavBarVariantWork';
import WorkshopPage from '../components/WorkshopPage';
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import CloseIcon from "@mui/icons-material/Close";
import React from 'react';
import NewVehiclePage from '../components/NewVehiclePage';
import WorkshopHistoryPage from '../components/WorkshopHistoryPage';


const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "judson",
      },
    },
    palette: {
      black:{
        main: "#000000",
      },
      aqua:{
        main: "#28D3C9"
      },
      yellow: {
        main: "#ffd700",
      },
      pink:{
        main: "#FF4090"
      }
    },
  });

const actionar = (snackbarID) => (
  <React.Fragment>
    <IconButton sx={{color:'white'}} onClick={() => closeSnackbar(snackbarID)}>
      <CloseIcon></CloseIcon>
    </IconButton>
  </React.Fragment>
)

const WorkshopRouter = () => {
    return (
      <SnackbarProvider maxSnack={3} autoHideDuration={3600} action={actionar} >
        <ThemeProvider theme={theme}>
            <div className=''>
                <NavBarVariantWork/>
                <Routes>
                    <Route path='/newVehicle' element={<NewVehiclePage/>}/>
                    <Route path='/history' element={<WorkshopHistoryPage/>}/>
                    <Route path='/' element={<WorkshopPage/>}/> 
                </Routes>
            </div>
        </ThemeProvider>
        </SnackbarProvider>
    );
}

export default WorkshopRouter;