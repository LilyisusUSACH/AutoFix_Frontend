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
import { formatCurrency } from "../utils/utils";

const VehiclePage = () => {
  const { patente } = useParams();

  const [datos, setDatos] = useState<Vehicle>({
    id: 0,
    patente: "",
    marca: "",
    modelo: "",
    anofab: 0,
    km: 0,
    tipo: "",
    motor: "",
    nasientos: 0,
  });
  const [datosBoletas, setDatosBoletas] = useState<Receipt[]>([]);
  const navigate = useNavigate();

  const handleChangePatente = (event) => {
    setDatos((prevStatus) => ({
      ...prevStatus,
      patente:
        event.target.value.length > 6
          ? event.target.value.slice(1)
          : event.target.value,
    }));
  };

  const sendVehicle = (e) => {
    e.preventDefault()
    vehicleService
      .getVehicleByPatente(datos?.patente?.toLowerCase())
      .then((response) => {
        navigate("/pos/vehiculo/" + response.data.patente.toLowerCase());
        enqueueSnackbar("Vehiculo encontrado", { variant: "info" });
      })
      .catch((error) => {
        enqueueSnackbar("Patente de Vehiculo No Encontrado", {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    const init = () => {
      vehicleService.getVehicleByPatente(patente).then((response) => {
        setDatos(response.data);
        receiptService
          .getReceiptsByPatente(response.data.patente)
          .then((responseReceipt) => {
            setDatosBoletas(responseReceipt.data);
          });
      });
    };
    init();
  }, [patente]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", padding:"3vw" }}>
        <Paper
          sx={{
            borderRadius: "25px",
            textAlign: "center",
            flexGrow: "1",
            margin: "4vh 4vw",
            flexBasis: "400px",
            display: "grid",
            gridTemplateRows: "min-content min-content auto",
          }}
        >
          <Typography variant="h4"> Vehiculo </Typography>
          <Divider
            variant="middle"
            sx={{
              bgcolor: "black",
            }}
          />
          <form
            style={{
              display: "grid",
              placeItems: "center",
              margin: "10px 4vw 30px 3vw",
              rowGap: "30px",
              gridTemplateColumns: "max-content 2fr",
            }}
          >
            <Typography variant="h6">Patente:</Typography>
            <TextField
              variant="filled"
              size="small"
              value={datos.patente.toUpperCase()}
              onChange={handleChangePatente}
              InputProps={{
                inputProps: { style: { padding: "10px 7px" } },
              }}
              fullWidth
              sx={{
                gridColumn: "2",
                gridRow: "1",
                width: "calc(100% - 55px)",
                marginRight: "55px",
                justifySelf: "center",
                maxWidth: "300px",
              }}
            ></TextField>

            <IconButton
              type="submit"
              onClick={sendVehicle}
              sx={{
                gridColumn: "2",
                gridRow: "1",
                placeSelf: "end",
                width: "50px",
                height: "50px",
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
            <Typography variant="h6">Modelo:</Typography>
            <TextField
              variant="filled"
              size="small"
              value={datos?.modelo?.toUpperCase()}
              InputProps={{
                readOnly: true,
                inputProps: { style: { padding: "10px 7px" } },
              }}
              style={{
                width: "80%",
                maxWidth: "300px",
              }}
            ></TextField>
            <Typography variant="h6">Marca:</Typography>
            <TextField
              variant="filled"
              size="small"
              value={datos?.marca.toUpperCase()}
              InputProps={{
                readOnly: true,
                inputProps: { style: { padding: "10px 7px" } },
              }}
              style={{
                width: "80%",
                maxWidth: "300px",
              }}
            ></TextField>
            <Typography variant="h6">N° asientos</Typography>
            <TextField
              variant="filled"
              size="small"
              value={datos?.nasientos}
              InputProps={{
                readOnly: true,
                inputProps: {
                  style: { padding: "10px 7px", textAlign: "center" },
                },
              }}
              sx={{
                gridColumn: "2",
              }}
              style={{
                width: "80%",
                maxWidth: "300px",
              }}
            ></TextField>
            <Typography variant="h6">Año:</Typography>
            <TextField
              variant="filled"
              size="small"
              value={datos?.anofab}
              InputProps={{
                readOnly: true,
                inputProps: {
                  style: { padding: "10px 7px", textAlign: "center" },
                },
              }}
              style={{
                width: "80%",
                maxWidth: "300px",
              }}
            ></TextField>
            <Typography variant="h6">Tipo de motor:</Typography>
            <TextField
              variant="filled"
              size="small"
              value={datos?.motor.toUpperCase()}
              InputProps={{
                readOnly: true,
                inputProps: { style: { padding: "10px 7px" } },
              }}
              style={{
                width: "80%",
                maxWidth: "300px",
              }}
            ></TextField>
            <Typography variant="h6">Tipo de vehiculo:</Typography>
            <TextField
              variant="filled"
              size="small"
              value={datos?.tipo.toUpperCase()}
              InputProps={{
                readOnly: true,
                inputProps: { style: { padding: "10px 7px" } },
              }}
              style={{
                width: "80%",
                maxWidth: "300px",
              }}
            ></TextField>
          </form>
        </Paper>
        <Paper
          sx={{
            flexGrow: "2",
            borderRadius: "25px",
            textAlign: "center",
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
                  <TableCell width={"20%"} align="center">
                    Pagado
                  </TableCell>
                  <TableCell width={"20%"} align="center">
                    Costo total
                  </TableCell>
                  <TableCell width={"20%"} align="center">
                    Ir a detalle boleta
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datosBoletas.map((boleta, index) => (
                  <TableRow key={boleta.id}>
                    <TableCell>{boleta.id}</TableCell>
                    <TableCell align="center">
                      {boleta.regReparations?.length}
                    </TableCell>
                    <TableCell align="center">
                      {boleta.deliveredAt ? "Ya pagado" : "Aun por pagar"}
                    </TableCell>
                    <TableCell align="center" style={{fontWeight:"800"}}>
                      {boleta.deliveredAt ? formatCurrency(boleta.total) : "Aun pendiente"}
                    </TableCell>
                    <TableCell align="center">
                      <Button href={"/pos/boletas/" + boleta.id}>
                        Ver más
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};
export default VehiclePage;
