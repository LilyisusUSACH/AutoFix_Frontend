import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Vehicle } from '../types/types';
import vehicleService from "../services/vehicle.service";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const NewVehiclePage = () => {
  const [vehiculo, setVehicle] = useState<Vehicle>({
    id: null,
    patente: '',
    marca:'',
    modelo:'',
    anofab:0,
    km:0,
    tipo:'',
    motor: '',
    nasientos:0,
  });

  const carTypes = [
    'sedan',
    'hatchback',
    'suv',
    'pickup',
    'furgoneta'
  ]
  const motorTypes = [
    'gasolina',
    'diesel',
    'hibrido',
    'electrico'
  ]

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    setVehicle({
      ...vehiculo, [event.target.name]: event.target.value.toLowerCase(),
    })
  };
  const navigate = useNavigate();

  const handleSubmit = () => {
    let comprobation = true;
    for(const key in vehiculo){
      if((vehiculo[key as keyof Vehicle] === "")) comprobation = false;
    }
    if (comprobation)
     vehicleService.postNewVehicle(vehiculo).then(() => {
      enqueueSnackbar("Se añadio un nuevo vehiculo", {variant:'success'})
        navigate('/workshop')
      }
    )
  }

  return (
    <Grid
      container
      mt={"auto"}
      height={"90vh"}
      width={"100vw"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Grid
        item
        height={"100%"}
        width={"100%"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Paper
          elevation={10}
          square={false}
          sx={{
            margin: "auto",
            width: "35vw",
            height: "70vh",
            borderRadius: "20px",
            '@media screen and (min-width:650px) and (max-width: 1240px)': {
              width: "50vw",
            },
            '@media screen and (max-width: 650px)': {
              width: "80vw",
            },
          }}
        >
          <Paper
            elevation={2}
            sx={{
              position: "relative",
              top: "-25px", // Ajusta según lo que necesites
              width: "15rem",
              margin: "auto",
              paddingBlock:'13px',
              borderRadius: "5px",
              backgroundColor: "#3ACEB3",
              textAlign: "center",
              alignContent: "center",
              zIndex: 1,
            }}
          >
            <Typography variant="h5" color={"white"}>
              Ingresar Vehículo
            </Typography>
            <Divider
              variant="middle"
              sx={{
                mt: "2%",
                borderBottomWidth: "2px",
                opacity: 1,
                background: "white",
              }}
            ></Divider>
          </Paper>
          <Grid
            container
            mt={-3}
            direction={"column"}
            justifyContent={"space-evenly"}
            px={'5%'}
            height={"100%"}
          >
            <Grid item display={'flex'} >
              <TextField
                required
                fullWidth
                InputProps={{
                  style: { letterSpacing: "20px" },
                }}
                sx={{width:'45%', margin:'auto'}}
                value={vehiculo.patente}
                onChange={handleChange}
                name="patente"
                label="Patente"
                variant="filled"
              />
              <TextField
                required
                sx={{width:'45%', margin:'auto'}}
                type="number"
                name="km"
                value={vehiculo.km}
                onChange={handleChange}
                label="Kilometros Recorridos"
                variant="filled"
              />
            </Grid>
            <Grid item display={'flex'}>
              <TextField
                required
                sx={{width:'45%', margin:'auto'}}
                name="marca"
                value={vehiculo.marca}
                onChange={handleChange}
                label="Marca"
                variant="filled"
              />
              <TextField
                required
                sx={{width:'45%', margin:'auto'}}
                name="modelo"
                value={vehiculo.modelo}
                onChange={handleChange}
                label="Modelo"
                variant="filled"
              />
            </Grid>
            <Grid item  display={'flex'}>
              <TextField
                required
                id="filled-select-currency"
                select
                name="tipo"
                defaultValue={0}
                value={vehiculo.tipo}
                sx={{width:'45%', margin:'auto'}}
                label="Tipo de vehiculo"
                variant="filled"
                onChange={handleChange}
              >
                {carTypes.map((item, index) => (
                  <MenuItem key={index} value={item}>{item.toUpperCase()}</MenuItem>
                ))}
              </TextField>
              <TextField
                sx={{width:'45%', margin:'auto'}}
                select
                required
                value={vehiculo.motor}
                defaultValue={0}
                onChange={handleChange}
                name="motor"
                label="Tipo de Motor"
                variant="filled"
              >
                {motorTypes.map((item, index) => (
                  <MenuItem key={index} value={item}>{item.toUpperCase()}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item  display={'flex'}>
              <TextField
                required
                sx={{width:'45%', margin:'auto'}}
                name="anofab"
                value={vehiculo.anofab}
                onChange={handleChange}
                label="Año de fabricacion"
                variant="filled"
              />
              <TextField
                required
                sx={{width:'45%', margin:'auto'}}
                name="nasientos"
                value={vehiculo.nasientos}
                onChange={handleChange}
                label="Numero de asientos"
                variant="filled"
              />
            </Grid>
            <Grid item textAlign={'center'}>
                <Button variant="contained" sx={{ width:'80%',backgroundColor:"#FB428F", paddingBlock:'10px',
                '&:hover':{
                  backgroundColor:"#FB428F",
                  filter:'brightness(95%)'
                }}} onClick={handleSubmit}>Registrar vehiculo</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default NewVehiclePage;
