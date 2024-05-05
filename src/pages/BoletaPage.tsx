import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatCurrency, formatPhrase } from "../utils/utils";
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import receiptService from "../services/receipt.service";
import { Bono, Receipt } from "../types/types";
import { repTypes } from "../constants";

const BoletaPage = () => {
  const { id } = useParams();

  const [isPaid, setIsPaid] = useState(true);
  const [uncomplete, setUncomplete] = useState(false);
  const [datos, setDatos] = useState<Receipt>();
  const [mostrarPantallaCompleta, setMostrarPantallaCompleta] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectBoleta, setSelectBoleta] = useState(false);
  const [bonosDisponibles, setBonosDisponibles] = useState<Bono[]>([]);
  const [boletasDisponibles, setBoletasDisponibles] = useState<Receipt[]>([]);

  const handleAbrirPantallaCompleta = () => {
    if (!(isPaid || uncomplete)) {
      receiptService.getBonosByMarca(datos?.patente?.marca).then((response) => {
        setBonosDisponibles(response.data);
      });
      setMostrarPantallaCompleta(true);
    }
  };

  const navigate = useNavigate();

  const handleCerrarPantallaCompleta = () => {
    setMostrarPantallaCompleta(false);
  };

  const handleBoleta = () => {
    setSelectBoleta(true);
    receiptService
      .getReceiptsByPatente(datos?.patente?.patente?.toLocaleLowerCase())
      .then((response) => {
        setBoletasDisponibles(response.data);
      });
  };

  const cerrarSelectBoleta = () => {
    setSelectBoleta(false);
  };

  const handleCheck = () => {
    return;
  };

  const init = () => {
    receiptService.getReceipt(id).then((response) => {
      setIsPaid(response.data.pagado);
      setChecked(response.data.bono != null);
      if (response.data.pagado) setDatos(response.data);
      else
        receiptService
          .postCalculate(id, false, null)
          .then((response2) => {
            setDatos(response2.data);
            if (response2.data.bono != null) {
              setChecked(true);
            }
          })
          .catch((error) => {
            setDatos(response.data);
            setUncomplete(true);
          });

      //console.log(datos);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handlePay = () => {
    setDatos((prevState) => ({
      ...prevState,
      pagado: true,
    }));
    receiptService.putReceipt(id);
    window.location.reload();
  };

  const handleOptionClick = (option: Bono) => {
    receiptService.postCalculate(id, true, option.id).then((response2) => {
      setDatos(response2.data);
      if (response2.data.bono != null) {
        setChecked(true);
      }
    });
    if (datos?.bono?.id === option.id) {
      setDatos((prevState) => ({
        ...prevState,
        bono: null,
      }));
      setMostrarPantallaCompleta(false);
      setChecked(false);
      return;
    }
    setDatos((prevState) => ({
      ...prevState,
      bono: option,
    }));
    setMostrarPantallaCompleta(false);
    setChecked(true);
  };

  return (
    <>
      <Grid container minHeight={"89vh"}>
        <Grid item xs={12} md={5} minHeight={"80vh"} marginBlock={"40px"}>
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
            <Typography variant="h4"> Boleta </Typography>
            <Divider
              variant="middle"
              sx={{
                bgcolor: "black",
              }}
            />
            <Grid container width={"90%"} height={"100%"} margin={"auto"}>
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
                  value={datos?.patente?.patente?.toUpperCase()}
                  onChange={(event) =>
                    setDatos((prevState) => ({
                      ...prevState,
                      patente: {
                        ...prevState?.patente,
                        patente: event.target.value,
                      },
                    }))
                  }
                  InputProps={{ inputProps: { style: { padding: 7 } } }}
                  fullWidth
                  sx={{
                    marginInline: "40px",
                  }}
                ></TextField>
                <IconButton
                  //onClick={getStatus}
                  onClick={handleBoleta}
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
                }}
              >
                <Typography variant="h6">Bono:</Typography>
                <Checkbox
                  checked={checked}
                  onChange={handleCheck}
                  size="large"
                  sx={{
                    cursor: "auto",
                    pointerEvents: "none", // Desactivar interacción con el mouse
                    "&:hover": {
                      // Deshabilitar el efecto de hover
                      backgroundColor: "transparent",
                    },
                  }}
                  icon={<HighlightOffIcon />}
                  checkedIcon={<CheckCircleIcon />}
                />

                <TextField
                  value={
                    datos?.bono
                      ? datos.bono.id +
                        ".- " +
                        datos.bono?.marca?.toUpperCase() +
                        " " +
                        formatCurrency(datos.bono.amount)
                      : ""
                  }
                  label="Seleccionar opción"
                  disabled={isPaid || uncomplete}
                  onClick={handleAbrirPantallaCompleta}
                  size="small"
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Dialog
                  open={mostrarPantallaCompleta}
                  onClose={handleCerrarPantallaCompleta}
                  fullWidth
                  maxWidth="xs"
                >
                  <DialogTitle>
                    Seleccione uno de los Bonos disponibles
                  </DialogTitle>
                  <List>
                    {bonosDisponibles.length > 0 ? (
                      bonosDisponibles.map((option) => (
                        <ListItemButton
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          sx={{
                            backgroundColor:
                              datos?.bono != null && option.id == datos.bono.id
                                ? "lightgrey"
                                : "",
                          }}
                        >
                          <ListItemText
                            sx={{
                              textAlign: "center",
                            }}
                            primary={
                              option.id + ".- " + option.marca?.toUpperCase()
                            }
                            secondary={formatCurrency(option.amount)}
                          />
                        </ListItemButton>
                      ))
                    ) : (
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          background: "lightgrey",
                        }}
                      >
                        No hay bonos disponibles para su marca
                      </Typography>
                    )}
                  </List>
                </Dialog>
              </Grid>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "40vh",
                }}
              >
                <Typography variant="h6">Detalles:</Typography>
                <TableContainer
                  sx={{
                    height: "85%",
                  }}
                >
                  <Table
                    stickyHeader
                    sx={{ minWidth: "650" }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell width={"60%"}>Descripcion</TableCell>
                        <TableCell align="right">Porcentaje</TableCell>
                        <TableCell width={"30%"} align="right">
                          Valor
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datos?.details?.map(
                        (option) =>
                          option.value != 0 && (
                            <TableRow key={option.id}>
                              <TableCell>
                                {formatPhrase(option.description)}
                              </TableCell>
                              <TableCell align="right">
                                {option?.percent ? option?.percent * 100 : ""}%
                              </TableCell>
                              <TableCell align="right">
                                {formatCurrency(option.value)}
                              </TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  paddingBottom: "10px",
                }}
              >
                <Typography variant="h6" minWidth={"fit-content"}>
                  Costo Total:
                </Typography>
                <TextField
                  margin="dense"
                  variant="filled"
                  size="small"
                  value={
                    uncomplete
                      ? "No determinado"
                      : formatCurrency(datos?.costoTotal)
                  }
                  InputProps={{
                    readOnly: true,
                    inputProps: {
                      style: { padding: 7, textAlign: "center" },
                    },
                  }}
                  sx={{
                    marginInline: "40px",
                  }}
                ></TextField>
              </Grid>
              {uncomplete || isPaid ? (
                <Paper
                  sx={{
                    width: "80%",
                    margin: "auto",
                    paddingBlock: "6px",
                    backgroundColor: "InfoText",
                    color: "white",
                  }}
                >
                  <Typography variant="h5">
                    {uncomplete ? "Aun en reparaciones" : "Boleta pagada"}
                  </Typography>
                </Paper>
              ) : (
                <Button
                  variant="contained"
                  onClick={handlePay}
                  sx={{
                    width: "80%",
                    margin: "auto",
                    backgroundColor: "#FB428F",
                    paddingBlock: "10px",
                    fontSize: "1.5rem",
                    padding: "3px",
                    "&:hover": {
                      backgroundColor: "#FB428F",
                      filter: "brightness(95%)",
                    },
                  }}
                >
                  Pagar
                </Button>
              )}
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
            <Typography variant="h4">Reparaciones asociadas</Typography>
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
                    <TableCell width={"35%"}>Nombre</TableCell>
                    <TableCell width={"20%"}>Fecha Ingreso</TableCell>
                    <TableCell width={"20%"}>Fecha Salida</TableCell>
                    <TableCell width={"20%"}>Fecha Retiro</TableCell>
                    <TableCell width={"10%"} align="right">
                      Monto
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos?.reparaciones?.map((reparaciones) => (
                    <TableRow key={reparaciones.id}>
                      <TableCell>
                        {repTypes[reparaciones.typeRep - 1]}
                      </TableCell>
                      <TableCell>
                        {reparaciones.fechaIngreso} <br />
                        {reparaciones.horaIngreso}
                      </TableCell>
                      <TableCell>
                        {reparaciones.fechaSalida
                          ? reparaciones.fechaSalida +
                            "\n" +
                            reparaciones.horaSalida
                          : "En taller"}
                      </TableCell>
                      <TableCell>
                        {uncomplete
                          ? "Aun en reparaciones"
                          : reparaciones.fechaRetiro
                          ? reparaciones.fechaRetiro +
                            "\n" +
                            reparaciones.horaRetiro
                          : "Disponible para retiro"}
                      </TableCell>
                      <TableCell align="right">
                        <Typography>
                          {formatCurrency(reparaciones.montoTotal)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={selectBoleta}
        onClose={cerrarSelectBoleta}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Seleccionar una boleta para su vehiculo</DialogTitle>
        <List>
          {boletasDisponibles.map((boleta) => (
            <ListItemButton
              key={boleta.id}
              onClick={() => {
                navigate(`/pos/boletas/${boleta.id}`);
                window.location.reload();
                setSelectBoleta(false);
              }}
              sx={{
                paddingBlock: "15px",
                fontSize: "1.5rem",
              }}
            >
              {"Codigo: " + boleta.id + " Pagado: " + boleta.pagado}
              <br />
              {" Cantidad reparaciones: " + boleta.reparaciones?.length}
            </ListItemButton>
          ))}
        </List>
      </Dialog>
    </>
  );
};
export default BoletaPage;
