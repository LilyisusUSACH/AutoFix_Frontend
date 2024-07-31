import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatCurrency, formatDateTime, formatPhrase } from "../utils/utils";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
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
import bonoService from "../services/bono.service";
import { AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";

//TODO: RECUERDA EL OVERFLOW AUTO

const BoletaPage = () => {
  const { id } = useParams();

  const [isPaid, setIsPaid] = useState(true);
  const [uncomplete, setUncomplete] = useState(false);
  const [datos, setDatos] = useState<Receipt>({
    id: null,
    vehicle: null,
    patente: "",
    details: [],
    bono: null,
    regReparations: [],
    deliveredAt: "",
    sumaRep: 0,
    total: 0,
  });
  const [mostrarPantallaCompleta, setMostrarPantallaCompleta] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectBoleta, setSelectBoleta] = useState(false);
  const [bonosDisponibles, setBonosDisponibles] = useState<Bono[]>([]);
  const [boletasDisponibles, setBoletasDisponibles] = useState<Receipt[]>([]);

  const handleAbrirPantallaCompleta = () => {
    if (!(isPaid || uncomplete)) {
      bonoService
        .getBonosByMarca(datos?.vehicle.marca)
        .then((response: AxiosResponse<Bono[]>) => {
          if (datos.bono) response.data.unshift(datos.bono);
          setBonosDisponibles(response.data);
        })
        .catch((error) => setBonosDisponibles([datos.bono]));
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
      .getReceiptsByPatente(datos?.patente.toLowerCase())
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

  useEffect(() => {
    const init = () => {
      receiptService
        .getReceipt(id)
        .then((response) => {
          setIsPaid(response.data.deliveredAt ? true : false);
          setChecked(response.data.bono != null);
          if (response.data.deliveredAt) {
            receiptService.getFinalDetails(id).then((response2) => {
              setDatos((prevState) => ({
                ...prevState,
                details: response2.data,
              }));
            })
            setDatos(response.data)
          }
          else
            receiptService
              .postCalculate(id, null)
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
        })
        .catch(() => setUncomplete(true));
    };
    init();
  }, []);

  const handlePay = () => {
    if (datos.regReparations.some((reg) => reg.completedAt == null)) {
      enqueueSnackbar(
        "Debe esperar a que las reparaciones esten listas para pagar",
        { variant: "warning" }
      );
      return;
    }
    receiptService.putReceipt(id).then(() => {
      window.location.reload();
    });
  };

  const handleOptionClick = (option: Bono) => {
    if (datos.bono?.id === option.id) {
      receiptService.postCalculate(id, -1).then((response2) => {
        setDatos(response2.data);
        if (response2.data.bono != null) {
          setChecked(true);
        }
      });
      setDatos((prevState) => ({
        ...prevState,
        bono: null,
      }));
      setMostrarPantallaCompleta(false);
      setChecked(false);
      return;
    }
    receiptService.postCalculate(id, option.id).then((response2) => {
      setDatos(response2.data);
      if (response2.data.bono != null) {
        setChecked(true);
      }
    });
    setDatos((prevState) => ({
      ...prevState,
      bono: option,
    }));
    setMostrarPantallaCompleta(false);
    setChecked(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3vw",
          padding: "20px",
          "@media (width > 1100px)": {
            gridTemplateColumns: "1fr 2fr",
          },
        }}
      >
        <Paper
          sx={{
            borderRadius: "25px",
            textAlign: "center",
            placeSelf: "center",
            display: "grid",
            overflow: "clip",
          }}
        >
          <Typography variant="h4"> Boleta </Typography>
          <Divider
            variant="middle"
            sx={{
              bgcolor: "black",
            }}
          />
          <div style={{ display: "grid" }}>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "grid",
                margin: "10px 20px",
                gridTemplateColumns: "1fr 3fr 50px",
                columnGap: "50px",
                placeItems: "center",
              }}
            >
              <Typography variant="h6">Patente:</Typography>
              <TextField
                margin="dense"
                variant="filled"
                size="medium"
                value={datos?.patente.toUpperCase()}
                onChange={(event) =>
                  setDatos((prevState) => ({
                    ...prevState,
                    patente: event.target.value,
                  }))
                }
                InputProps={{ inputProps: { style: { padding: "10px 12px" } } }}
                fullWidth
              ></TextField>
              <IconButton
                type="submit"
                onClick={handleBoleta}
                sx={{
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
            </form>
            <div
              style={{
                display: "grid",
                margin: "10px 20px",
                gridTemplateColumns: "1fr 50px 3fr",
                columnGap: "50px",
                placeItems: "center",
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
                    backgroundColor: "transparent",
                  },
                }}
                icon={<HighlightOffIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
              <TextField
                style={{ width: "80%" }}
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
                  inputProps: { style: { padding: "10px 12px" } },
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
                    bonosDisponibles?.map((option) => (
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
            </div>
            <div
              style={{
                display: "grid",
                height: "50vh",
                gridTemplateRows: "min-content auto",
              }}
            >
              <Typography variant="h6">Detalles:</Typography>
              <TableContainer
                sx={{
                  height: "100%",
                }}
              >
                <Table stickyHeader size="small" aria-label="a dense table">
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
                      (option, index) =>
                        option.value != 0 && (
                          <TableRow key={index}>
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
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                  uncomplete ? "No determinado" : formatCurrency(datos?.total)
                }
                InputProps={{
                  readOnly: true,
                  inputProps: {
                    style: { padding: "10px 12px", textAlign: "center" },
                  },
                }}
                sx={{
                  marginInline: "40px",
                }}
              ></TextField>
            </div>
            {uncomplete || isPaid ? (
              <Paper
                sx={{
                  placeSelf: "center",
                  padding: "10px 50px",
                  backgroundColor: "InfoText",
                  color: "white",
                }}
              >
                <Typography variant="h5">
                  {uncomplete
                    ? "Aun en reparaciones"
                    : `Boleta pagada el ` + formatDateTime(datos.deliveredAt)}
                </Typography>
              </Paper>
            ) : (
              <Button
                variant="contained"
                onClick={handlePay}
                sx={{
                  placeSelf: "center",
                  padding: "3px 50px",
                  backgroundColor: "#FB428F",
                  fontSize: "1.5rem",
                  "&:hover": {
                    backgroundColor: "#FB428F",
                    filter: "brightness(95%)",
                  },
                }}
              >
                Pagar
              </Button>
            )}
          </div>
        </Paper>
        <Paper
          sx={{
            borderRadius: "25px",
            textAlign: "center",
            display: "grid",
            minHeight: "500px",
            gridTemplateRows: "min-content min-content auto",
          }}
        >
          <Typography variant="h4">Reparaciones asociadas</Typography>
          <Divider
            variant="middle"
            sx={{
              bgcolor: "black",
            }}
          />
          <TableContainer>
            <Table stickyHeader aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 800 }} width={"35%"}>
                    Nombre
                  </TableCell>
                  <TableCell style={{ fontWeight: 800 }} width={"20%"}>
                    Fecha Ingreso
                  </TableCell>
                  <TableCell style={{ fontWeight: 800 }} width={"20%"}>
                    Fecha Salida
                  </TableCell>
                  <TableCell style={{ fontWeight: 800 }} width={"20%"}>
                    Fecha Retiro
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: 800 }}
                    width={"10%"}
                    align="right"
                  >
                    Monto
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datos?.regReparations?.map((reparaciones) => (
                  <TableRow key={reparaciones.id}>
                    <TableCell>{reparaciones.reparation.nombre}</TableCell>
                    <TableCell>
                      {formatDateTime(reparaciones.createdAt)}
                    </TableCell>
                    <TableCell>
                      {reparaciones.completedAt
                        ? formatDateTime(reparaciones.completedAt)
                        : "En taller"}
                    </TableCell>
                    <TableCell>
                      {uncomplete
                        ? "Aun en reparaciones"
                        : datos.deliveredAt
                        ? formatDateTime(datos.deliveredAt)
                        : "Disponible para retiro"}
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={"800"}>
                        {formatCurrency(reparaciones.amount)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Dialog
        open={selectBoleta}
        onClose={cerrarSelectBoleta}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Seleccionar una boleta para su vehiculo</DialogTitle>
        <List>
          {boletasDisponibles?.map((boleta) => (
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
              {"Codigo: " +
                boleta.id +
                " Pagado: " +
                (boleta.deliveredAt ? "Si" : "No")}
              <br />
              {" Cantidad reparaciones: " + boleta.regReparations?.length}
            </ListItemButton>
          ))}
        </List>
      </Dialog>
    </>
  );
};
export default BoletaPage;
