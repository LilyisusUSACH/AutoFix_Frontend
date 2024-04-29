import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./a.css";
import patente from "../assets/patente.png";
import clientService from "../services/client.service";
import { useState } from "react";

const MyVehiclePage = () => {
  const [pat, setPat] = useState("");
  const [searched, setSearched] = useState(false);
  const [status, setStatus] = useState("");

  const getStatus = () => {
    clientService
      .getStatus(pat.toLowerCase())
      .then((response) => {
        setSearched(true);
        setStatus(response.data.estado);
        console.log(response);
      })
      .catch(() => {
        setSearched(false);
        setStatus("");
        alert("El vehiculo no ha sido registrado");
      });
  };

  const handleChange = (event) => {
    setPat(event.target.value.toUpperCase().slice(0,6));
  };

  return (
    <Grid container alignContent={"center"} justifyContent={"center"}>
      <Grid item mt={8} height={"100px"}>
        <Paper
          square={false}
          sx={{
            padding: "3px 10px 3px 10px",
            backgroundColor: "black.main",
            color: "yellow.main",
            borderRadius: "30px",
          }}
        >
          <Typography variant="h5" textAlign={"center"}>
            Mi vehiculo
          </Typography>
        </Paper>
      </Grid>
      <Grid
        item
        container
        height={"100%"}
        width={"100vw"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Grid item height={"60%"} width={"38%"}>
          <Paper
            elevation={10}
            square={false}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "65px",
            }}
          >
            <Grid
              container
              direction={"column"}
              alignItems={"center"}
              rowSpacing={"4%"}
            >
              <Grid
                item
                alignItems={"center"}
                justifyContent={"center"}
                display={searched ? "none" : ""}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <img
                    src={patente}
                    style={{
                      width: "40%",
                      height: "auto",
                    }}
                  ></img>
                </Box>
              </Grid>
              <Grid item width={"90%"}>
                <Typography textAlign={"center"} variant="h4">
                  {"Consulta por patente"}
                </Typography>
                <Divider
                  variant="fullWidth"
                  sx={{
                    mt: "2%",
                    borderBottomWidth: "1px",
                    opacity: 1,
                    background: "black",
                  }}
                ></Divider>
              </Grid>
              <Grid item width={"80%"}>
                <Typography
                  textAlign={"center"}
                  variant="h6"
                  sx={{
                    lineHeight: "1.2",
                  }}
                >
                  {
                    "Ingresa tu patente para conocer el estado actual de las reparaciones"
                  }
                </Typography>
              </Grid>
              <Grid item width={"90%"} textAlign={"center"}>
                <TextField
                  // TODO: validar
                  required
                  sx={{
                    width: "50%",
                    letterSpacing: '200px',
                  }}
                  InputProps={{
                    style: { letterSpacing: '20px' }
                  }}
                  onChange={handleChange}
                  value={pat}
                  label="Patente"
                  variant="filled"
                  size="small"
                />
                <IconButton
                  onClick={getStatus}
                  sx={{
                    ml: "1rem",
                    mt: "0.2rem",
                    border: "0.5px solid black",
                    backgroundColor: "yellow.main",
                    "&:hover": {
                      backgroundColor: "green.main",
                    },
                  }}
                >
                  <SendIcon
                    sx={{
                      color: "white.main",
                      strokeOpacity: "1",
                      strokeWidth: "0.5px",
                      stroke: "black",
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid
                item
                display={searched ? "" : "none"}
                justifyContent="center"
                alignItems={"center"}
                container
              >
                <Paper
                  sx={{
                    alignSelf:'center',
                    width: "75%",
                    backgroundColor: "rgba(243,255,101,0.17)",
                    padding:'2%'
                  }}
                >
                  <Typography textAlign={"center"} variant="h6" fontStyle={"italic"} sx={{lineHeight:'1.2'}}>
                    {status}
                  </Typography>
                </Paper>
              </Grid>
              <Grid
                item
                display={"flex"}
                justifySelf={"flex-end"}
                width={"63%"}
              >
                <Typography
                  textAlign={"center"}
                  fontStyle={"italic"}
                  sx={{
                    color: "#5a5a5a",
                  }}
                  mb={"5%"}
                >
                  {
                    "En caso de presentar problemas comunicarse al whatsapp o a través de los medios oficiales"
                  }
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MyVehiclePage;
