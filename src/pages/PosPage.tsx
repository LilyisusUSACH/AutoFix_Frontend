import {
  Grid,
  Paper,
  IconButton,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import vehicleService from "../services/vehicle.service";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const PosPage = () => {
  const [patente, setPatente] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    vehicleService
      .getVehicleByPatente(patente.toLowerCase())
      .then((response) => {
        navigate("/pos/vehiculo/" + response.data.id);
        enqueueSnackbar("Vehiculo encontrado", { variant: "info" });
      })
      .catch(() => {
        enqueueSnackbar("Patente de Vehiculo No Encontrado", {
          variant: "error",
        });
      });
  };
  return (
    <Grid
      container
      alignContent={"center"}
      min-height={"86vh"}
      height={"86vh"}
      marginTop={"20px"}
      paddingInline={"5%"}
    >
      <Grid
        item
        xs={12}
        md={8}
        container
        direction={"column"}
        height={"100%"}
        justifyContent={"space-around"}
      >
        <Grid item xs={6} padding={"20px"}>
          <Paper
            elevation={8}
            sx={{
              height: "100%",
              width: "70%",
              alignItems: "center",
              justifyItems: "center",
              borderRadius: "30px",
            }}
          >
            <Grid
              container
              direction={"column"}
              justifyContent={"space-evenly"}
              height={"100%"}
            >
              <Grid item>
                <Typography textAlign={"center"} variant="h4">
                  {"Consultar cliente"}
                </Typography>
                <Divider
                  variant="fullWidth"
                  sx={{
                    mt: "2%",
                    marginInline: "15%",
                    borderBottomWidth: "1px",
                    opacity: 1,
                    background: "black",
                  }}
                ></Divider>
              </Grid>
              <Grid item>
                <Typography
                  textAlign={"center"}
                  variant="h6"
                  sx={{
                    lineHeight: "1.2",
                  }}
                >
                  {"Ingresa Patente del cliente para conocer su deuda actual"}
                </Typography>
              </Grid>
              <Grid item textAlign={"center"}>
                <TextField
                  // TODO: validar
                  required
                  sx={{
                    width: "50%",
                    letterSpacing: "200px",
                  }}
                  InputProps={{
                    style: { letterSpacing: "20px" },
                  }}
                  //onChange={handleChange}
                  onChange={(event) => setPatente(event.target.value)}
                  value={patente.toUpperCase()}
                  label="Patente"
                  variant="filled"
                  size="small"
                />
                <IconButton
                  //onClick={getStatus}
                  onClick={handleClick}
                  sx={{
                    ml: "1rem",
                    mt: "0.2rem",
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
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} padding={"20px"}>
          <Paper
            elevation={8}
            sx={{
              height: "100%",
              borderRadius: "20px",
              backgroundColor: "#FF4090",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography paddingTop={"10px"} variant="h4">
              {"Cantidad de reparaciones"}
            </Typography>
            <Divider
              variant="middle"
              sx={{
                marginInline: "15%",
                borderBottomWidth: "1px",
                opacity: 1,
                background: "white",
              }}
            ></Divider>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        item
        xs={4}
        height={"100%"}
        padding={"20px"}
        alignContent={"center"}
      >
        <Paper
          elevation={8}
          sx={{
            height: "100%",
            borderRadius: "30px",
          }}
        >
          <Grid
            container
            direction={"column"}
            width={"100%"}
            height={"100%"}
            textAlign={"center"}
            justifyContent={"start"}
            rowGap={"3%"}
            pt={"5%"}
          >
            <Grid item>
              <Typography variant="h4">Reportes</Typography>
              <Divider
                variant="fullWidth"
                sx={{
                  mt: "2%",
                  marginInline: "15%",
                  borderBottomWidth: "1px",
                  opacity: 1,
                  background: "black",
                }}
              ></Divider>
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontWeight: "300",
                  color: "gray",
                  marginBlock: "3%",
                }}
              >
                Aqui puedes ver los reportes mas frencuentes y necesarios
              </Typography>
            </Grid>
            <Grid
              item
              alignItems={"center"}
              container
              sx={{
                marginTop: "-5%",
                backgroundColor: "lightgrey",
              }}
            >
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  margin: "auto",
                  marginBottom: "10px",
                  opacity: 1,
                  width: "70%",
                  background: "black",
                }}
              ></Divider>
              <Typography
                width={"80%"}
                sx={{
                  marginBottom: "5px",
                }}
              >
                {"Reporte 1:"} <br /> {"Detalle de costos por cada vehiculo"}
              </Typography>
              <Link to="/pos/reporte/1">
                <IconButton
                  //onClick={getStatus}
                  sx={{
                    width: "40px",
                    height: "40px",
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
              </Link>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  margin: "auto",
                  opacity: 1,
                  marginTop: "10px",
                  width: "70%",
                  background: "black",
                }}
              ></Divider>
            </Grid>
            <Grid item container alignItems={"center"}>
              <Typography width={"80%"}>
                {"Reporte 2:"} <br />{" "}
                {"Tipo de reparacion segun tipo de vehiculo"}
              </Typography>
              <Link to="/pos/reporte/2">
                <IconButton
                  //onClick={getStatus}
                  sx={{
                    width: "40px",
                    height: "40px",
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
              </Link>
            </Grid>
            <Grid
              item
              container
              alignItems={"center"}
              sx={{
                backgroundColor: "lightgrey",
              }}
            >
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  margin: "auto",
                  opacity: 1,
                  width: "70%",
                  background: "black",
                  marginBottom: "10px",
                }}
              ></Divider>
              <Typography
                width={"80%"}
                sx={{
                  marginBottom: "5px",
                }}
              >
                {"Reporte 3"} <br /> {"Tiempo de reparacion promedio por marca"}
              </Typography>
              <Link to="/pos/reporte/3">
                <IconButton
                  //onClick={getStatus}
                  sx={{
                    width: "40px",
                    height: "40px",
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
              </Link>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  margin: "auto",
                  opacity: 1,
                  marginTop: "15px",
                  width: "70%",
                  background: "black",
                }}
              ></Divider>
            </Grid>
            <Grid item container alignItems={"center"}>
              <Typography width={"80%"}>
                {"Reporte 4"} <br /> {"Tipo de reparacion segun tipo de motor"}
              </Typography>
              <Link to="/pos/reporte/4">
                <IconButton
                  //onClick={getStatus}
                  sx={{
                    width: "40px",
                    height: "40px",
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
              </Link>
              <Divider
                sx={{
                  borderBottomWidth: "1px",
                  margin: "auto",
                  opacity: 1,
                  marginTop: "15px",
                  width: "70%",
                  background: "black",
                }}
              ></Divider>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PosPage;
