import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material';
import NavBarVariant from '../components/NavBarVariant';
import MyVehiclePage from '../components/MyVehiclePage';

const theme = createTheme({
    typography:{
        allVariants:{
            fontFamily:'judson'
        }
    },
  palette: {
    black: {
      main: "#000000",
    },
    yellow: {
      main: "#ffd700",
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

const MyVehicleRouter = () => {
    return (
        <ThemeProvider theme={theme}>
        <div className=''>
            <NavBarVariant/>
            <Routes>
                <Route path='*' element={<MyVehiclePage/>}/>
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default MyVehicleRouter;