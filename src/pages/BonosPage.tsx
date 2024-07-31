import {
  Button,
  Dialog,
  Divider,
  Fab,
  Grid,
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
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Bono } from "../types/types";
import bonoService from "../services/bono.service";
import { formatCurrency } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const BonosPage = () => {
  const [BonosDisponibles, setBonosDisponibles] = useState<Bono[]>([]);
  const [BonosHistorial, setBonosHistorial] = useState<Bono[]>([]);
  const [bonoOpen, setBonoOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const init = () => {
      bonoService.getBonos().then((response) => {
        setBonosDisponibles(response.data);
      });
      bonoService.getBonosUsados().then((response) => {
        setBonosHistorial(response.data);
      });
    };
    init();
  }, [bonoOpen]);
  const handleClickOpen = () => {
    setBonoOpen(true);
  };
  const [newBono, setNewBono] = useState({
    marca: "",
    amount: "",
  });
  const changeMarca = (event) => {
    setNewBono((prevState) => ({
      ...prevState,
      marca: event.target.value.toLowerCase(),
    }));
  };
  const changeamount = (event) => {
    setNewBono((prevState) => ({
      ...prevState,
      amount: event.target.value,
    }));
  };
  const handleSubmit = () => {
    bonoService.postNewBono(newBono).then(() => {
      enqueueSnackbar("Bono añadido con exito", { variant: "info" });
      setBonoOpen(false);
    });
  };

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          "@media (width < 900px)": {
            marginTop: "20px",
          },
        }}
      >
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              position: "relative",
              minHeight: "60vh",
              width: "80%",
              margin: "auto",
              borderRadius: "25px",
              textAlign: "center",
            }}
          >
            <Typography variant="h4"> Bonos Disponibles </Typography>
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
                    <TableCell width={"10%"}>Id</TableCell>
                    <TableCell align="center">Marca</TableCell>
                    <TableCell align="right">Monto descuento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {BonosDisponibles.map((bono, index) => (
                    <TableRow key={bono.id}>
                      <TableCell width={"10%"}>{bono.id}</TableCell>
                      <TableCell align="center">
                        {bono.marca?.toUpperCase()}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(bono.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Fab
              size="large"
              onClick={handleClickOpen}
              sx={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                color: "common.white",
                border: "0.5px solid black",
                bgcolor: "#28D3C9",
                "&:hover": {
                  bgcolor: "#30A3C9",
                },
              }}
              aria-label="add"
            >
              <AddIcon
                style={{
                  width: "90%",
                  height: "90%",
                }}
              />
            </Fab>
          </Paper>
        </Grid>
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
            <Typography variant="h4">Historial Bonos</Typography>
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
                    <TableCell width={"10%"}>Id</TableCell>
                    <TableCell align="center">Marca</TableCell>
                    <TableCell align="right">Monto descuento</TableCell>
                    <TableCell width={"30%"} align="center">
                      Ir a boleta
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {BonosHistorial.map((bono, index) => (
                    <TableRow key={bono.id}>
                      <TableCell width={"10%"}>{bono.id}</TableCell>
                      <TableCell align="center">
                        {bono.marca?.toUpperCase()}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(bono.amount)}
                      </TableCell>
                      <TableCell width={"30%"} align="center">
                        <Link to={"/pos/boletas/" + bono.receiptId}>
                          <Button variant="contained" size="small">
                            Ir a la boleta
                          </Button>
                        </Link>
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
        open={bonoOpen}
        onClose={() => setBonoOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { height: "60%", borderRadius: "25px", width: "40%" },
        }}
      >
        <Grid
          container
          direction={"column"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          height={"100%"}
        >
          <Grid item>
            <Typography fontWeight={800} variant="h4">
              {"Nuevo Bono"}
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
          <Grid item textAlign={"center"} width={"70%"}>
            <Typography variant="h6" fontStyle={"italic"}>
              Ingrese la marca y el valor del bono
            </Typography>
          </Grid>
          <Grid item width={"70%"}>
            <TextField
              required
              fullWidth
              sx={{
                mb: 4,
              }}
              name="marca"
              value={newBono.marca.toUpperCase()}
              onChange={changeMarca}
              label="Marca"
              variant="filled"
              size="small"
            />
            <TextField
              required
              label="Monto del bono"
              name="typeRep"
              value={newBono.amount}
              onChange={changeamount}
              variant="filled"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#FF4090",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#FF4090",
                  filter: "brightness(95%)",
                },
              }}
            >
              Registrar Nuevo Bono
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
export default BonosPage;
