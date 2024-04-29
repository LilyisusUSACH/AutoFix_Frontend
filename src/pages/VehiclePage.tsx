import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import receiptService from "../services/receipt.service";
import { Receipt, Vehicle } from "../types/types";
import vehicleService from "../services/vehicle.service";
import { enqueueSnackbar } from "notistack";

const VehiclePage = () => {
  const { id } = useParams();

  const [datos, setDatos] = useState<Vehicle>();
  const [datosBoletas, setDatosBoletas] = useState<Receipt[]>([]);
  const navigate = useNavigate();

  const handleChangePatente = (event) => {
    setDatos( (prevStatus) => ({
      ...prevStatus,
      patente: event.target.value.length > 6 ? event.target.value.slice(1) : event.target.value
    }) )
  };

  const sendVehicle = () => {

    vehicleService.getVehicleByPatente(datos?.patente?.toLowerCase()).then(
      (response) => {
        navigate('/pos/vehiculo/'+response.data.id)
        enqueueSnackbar('Vehiculo encontrado', 
          { variant:'info'})
      }
    ).catch((error) => {
      enqueueSnackbar('Patente de Vehiculo No Encontrado', 
          { variant:'error'})
    } )
  }

  useEffect(() => {
    const init = () => {
      vehicleService.getVehicleById(id).then((response) => {
        setDatos(response.data);
        receiptService.getReceiptsByPatente(response.data.patente).then(
          (responseReceipt) => {
            setDatosBoletas(responseReceipt.data)
          }
        )
      });
    };
    init();
  }, [id]);

  return (
    <>
      <Grid container minHeight={"89vh"}>
        <Grid item xs={12} md={5} minHeight={"80vh"} marginBlock={"40px"}>
          <Paper
            sx={{
              minHeight: "60vh",
              width: "80%",
              margin: "auto",
              borderRadius: "25px",
              textAlign: "center",
              overflow: "auto",
            }}
          >
            <Typography variant="h4"> Vehiculo </Typography>
            <Divider
              variant="middle"
              sx={{
                bgcolor: "black",
              }}
            />
            <Grid
              container
              width={"90%"}
              height={"60vh"}
              justifyContent={"space-around"}
              margin={"auto"}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  paddingBlock: "10px",
                }}
              >
                <Typography variant="h6">Patente:</Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={datos?.patente?.toUpperCase()}
                  onChange={handleChangePatente}
                  InputProps={{
                    inputProps: { style: { padding: 7 } },
                  }}
                  fullWidth
                  sx={{
                    marginInline: "40px",
                  }}
                ></TextField>

                <IconButton
                  //onClick={getStatus}
                  onClick={sendVehicle}
                  sx={{
                    mt: "0.2rem",
                    mr: "2rem",
                    border: "0.5px solid black",
                    backgroundColor: "#1EBD96",
                    "&:hover": {
                      backgroundColor: "#1EBD96",
                      filter: "brightness(110%)",
                    },
                  }}
                >
                  <SendIcon
                    sx={{
                      color: "white",
                      strokeOpacity: "1",
                      strokeWidth: "0.5px",
                      stroke: "black",
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBlock: "10px",
                }}
              >
                <Typography variant="h6">Modelo:</Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={datos?.modelo?.toUpperCase()}

                  InputProps={{
                    readOnly: true,
                    inputProps: { style: { padding: 7 } },
                  }}
                  sx={{
                    width: "100%",
                    marginInline: "10px",
                  }}
                ></TextField>
                <Typography variant="h6">Marca:</Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={datos?.marca?.toUpperCase()}

                  InputProps={{
                    readOnly: true,
                    inputProps: { style: { padding: 7 } },
                  }}
                  sx={{
                    marginRight: "40px",
                    marginLeft: "10px",
                    width: "100%",
                  }}
                ></TextField>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBlock: "10px",
                }}
              >
                <Typography variant="h6">N° asientos</Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={datos?.nasientos}
                  InputProps={{
                    readOnly: true,
                    inputProps: { style: { padding: 7, textAlign:'center'} },
                  }}
                  sx={{
                    width: "50%",
                    marginInline: "10px",
                  }}
                ></TextField>
                <Typography variant="h6">Año:</Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={datos?.fabricationYear}
                  InputProps={{
                    readOnly: true,
                    inputProps: { style: { padding: 7, textAlign:'center' } },
                  }}
                  sx={{
                    marginRight: "40px",
                    marginLeft: "10px",
                    width: "100%",
                  }}
                ></TextField>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBlock: "10px",
                }}
              >
                <Typography variant="h6">Tipo de motor:</Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={datos?.motorType?.toUpperCase()}

                  InputProps={{
                    readOnly: true,
                    inputProps: { style: { padding: 7 } },
                  }}
                  sx={{
                    marginInline: "40px",
                  }}
                ></TextField>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBlock: "10px",
                }}
              >
                <Typography variant="h6">Tipo de vehiculo:</Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={datos?.carType?.toUpperCase()}
                  InputProps={{
                    readOnly: true,
                    inputProps: { style: { padding: 7 } },
                  }}
                  sx={{
                    marginInline: "40px",
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} minHeight={"80vh"} marginBlock={"40px"}>
          <Paper
            sx={{
              minHeight: "80vh",
              width: "80%",
              margin: "auto",
              borderRadius: "25px",
              textAlign: "center",
              overflow: "auto",
            }}
          >
            <Typography variant="h4">Boletas asociadas</Typography>
            <Divider
              variant="middle"
              sx={{
                bgcolor: "black",
              }}
            />
            <TableContainer
              sx={{
                maxHeight: "73vh",
              }}
            >
              <Table stickyHeader aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell width={"10%"}>ID</TableCell>
                    <TableCell width={"20%"}>Cantidad reparaciones</TableCell>
                    <TableCell width={"20%"} align="center">Pagado</TableCell>
                    <TableCell width={"20%"} align="center">Ir a detalle boleta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosBoletas.map( (boleta, index) => (
                    <TableRow key={boleta.id}>
                    <TableCell>{boleta.id}</TableCell>
                    <TableCell align="center">{boleta.reparaciones?.length}</TableCell>
                    <TableCell align="center">{boleta.pagado?"Ya pagado":"Aun por pagar"}</TableCell>
                    <TableCell align="center">
                      <Button href={"/pos/boletas/"+boleta.id} >
                        Ver más
                      </Button>
                    </TableCell>
                  </TableRow>
                  ) )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default VehiclePage;
