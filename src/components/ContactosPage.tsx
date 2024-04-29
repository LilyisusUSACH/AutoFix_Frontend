import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Grid, Typography } from "@mui/material";
import { Brightness1 } from "@mui/icons-material";

const ContactosPage = () => {
  return (
    <Grid container height={"90vh"} justifyContent={'space-around'} alignItems={"center"} direction={"row"}>
      <Grid item>
        <Typography textAlign={"center"} fontWeight={700} variant="h4">
          {"Visitanos en:"}
        </Typography>
        <br></br>
        <MapContainer
          style={{ border: "1px solid black", width: "30rem", height: "50vh" }}
          center={[-33.4532723, -70.6465594]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-33.4532723, -70.6465594]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <Button
          sx={{
            backgroundColor: "yellow.main",
            color: "black.main",
            borderRadius: "0px 0px 10px 10px",
            "&:hover": {
              backgroundColor: "yellow.main",
              filter: "grayscale(50%)",
            },
          }}
          variant="contained"
          fullWidth
          href="https://maps.app.goo.gl/LmttsSxNt5r68oZ48"
        >
          <Typography fontStyle={"italic"}>{"ver en maps"}</Typography>
        </Button>
      </Grid>
      <Grid
        item
        xs={5}
        container
        direction={"column"}
        alignContent={"center"}
        justifyContent={"space-evenly"}
        height={"50vh"}
        textAlign={"center"}
      >
        <Grid item>
          <Typography variant="h4" fontWeight={700}>
            {"Dirección"}
          </Typography>
          <br/>
          <Typography variant="h5">
            Avenida 10 de julio con 3 de abril
            <br /> A 5 pasos del metro falso
          </Typography>
        </Grid>
        <br></br>
        <Grid item>
          <Typography variant="h4" fontWeight={700}>
            {"Contacto"}
          </Typography>
          <br/>
          <Typography variant="h6">
            Numero celular:
            <br />
            +56 9 1234567
          </Typography>
          <br></br>
          <Typography variant="h6">
            Correo electronico:
            <br/> correofalso@gmail.com
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ContactosPage;
