import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  Divider,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  SnackbarCloseReason,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { ChangeEvent, useEffect, useState } from "react";
import workshopService from "../services/workshop.service";
import { repTypes } from "../constants";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { Link, useNavigate } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar, VariantType } from "notistack";
import { Reparation, Vehicle, ColumnData } from "../types/types";

// TODO: Separar Por componentes lo que se pueda

const VirtuosoTableComponents: TableComponents<Reparation> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Box} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const columns: ColumnData[] = [
  {
    width: 40,
    label: "Patente",
  },
  {
    width: 80,
    label: "Marca",
  },
  {
    width: 50,
    label: "Modelo",
  },
  {
    width: 150,
    label: "Tipo de reparacion",
  },
  {
    width: 80,
    label: "Fecha inicio",
  },
  {
    width: 40,
    label: "Completar",
  },
  {
    width: 40,
    label: "Cancelar",
  },
];
// TODO: poner botones y crear los update / delete
// TODO: arreglar fuentes
const Fila = (props: { style: object; index: number; row: Reparation, onComplete:unknown, onCancel:unknown }) => {
  const { style, index, row, onComplete, onCancel } = props;
  //console.log(typeof(onComplete));
  return (
    <>
      <TableCell sx={style} align="center" component="th" scope="row">
        {row.vehiculo.patente.toUpperCase()}
      </TableCell>
      <TableCell
        sx={{ background: index % 2 == 0 ? "lightgrey" : "white" }}
        align="center"
      >
        {row.vehiculo.marca.toUpperCase()}
      </TableCell>
      <TableCell
        sx={{ background: index % 2 == 0 ? "lightgrey" : "white" }}
        align="center"
      >
        {row.vehiculo.modelo.toUpperCase()}
      </TableCell>
      <TableCell
        sx={{ background: index % 2 == 0 ? "lightgrey" : "white" }}
        align="center"
      >
        {repTypes[row.typeRep-1]}
      </TableCell>
      <TableCell
        sx={{ background: index % 2 == 0 ? "lightgrey" : "white" }}
        align="center"
      >
        {row.fechaIngreso + " " + row.horaIngreso.slice(0, 5)}
      </TableCell>
      <TableCell
        sx={{ background: index % 2 == 0 ? "lightgrey" : "white" }}
        align="center"
      >
        <IconButton
          size="medium"
          aria-label="complete"
          onClick={onComplete}
          sx={{
            marginBlock: "-10px",
            border:'0.5px solid black',
            backgroundColor:'#5CD000',
            color: "white",
            "&:hover":{
              backgroundColor:'#5CD000',
              filter:'brightness(120%)'
            }
          }}
        >
          <CheckIcon fontSize="large" />
        </IconButton>
      </TableCell>
      <TableCell
        sx={{ background: index % 2 == 0 ? "lightgrey" : "white" }}
        align="center"
      >
        <IconButton sx={{
            marginBlock: "-10px",
            border:'0.5px solid black',
            backgroundColor:'#E91E63',
            color: "white",
            "&:hover":{
              backgroundColor:'#E91E63',
              filter:'brightness(80%)'
            }
          }} 
          onClick={onCancel}
          aria-label="cancel" size="medium">
          <CloseIcon fontSize="large" />
        </IconButton>
      </TableCell>
    </>
  );
};



const WorkshopPage = () => {
  const [filtered, setfiltered] = useState<Reparation[]>([]);
  const [reparations, setReparations] = useState<Reparation[]>([]);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    patente: "",
    typeRep: 0,
  });

  const onCancelRep = (id:number) => {
    enqueueSnackbar('Se cancelo la reparacion', 
      { variant:'error'});

    workshopService.deleteReparation(id).then((response) =>{
      //console.log(response);
      init();
    }
    );
  }

  const onCompleteRep = (id:number) => {
    workshopService.completeReparation(id).then((response) =>{
      //(response);
      enqueueSnackbar("Se completo la reparación", {variant:'info'})
      init();
    }
    );
  }

  const handleSubmit = () => {
    workshopService
      .postNewReparation({
        patente: formData.patente.toUpperCase(),
        typeRep: (formData.typeRep+1),
      })
      .then(() => {
        //console.log(response);
        setError(false);
        handleClose();
        init();
        handleSearch("");
        enqueueSnackbar('La reparación fue creada con éxito', { variant:'success' })
      })
      .catch(() => setError(true));
  };
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.name == "patente"
          ? event.target.value.toUpperCase()
          : event.target.value,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  const init = () => {
    workshopService
      .getActiveReparations()
      .then((response) => {
        setReparations(response.data);
        setfiltered(response.data);
        //console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (valorBuscado: string) => {
    console.log(reparations)
    const filasFiltradas = reparations.filter((fila) => {
      return (
        fila.vehiculo.patente
          .toLowerCase()
          .includes(valorBuscado.toLowerCase()) ||
        fila.vehiculo.marca
          .toLowerCase()
          .includes(valorBuscado.toLowerCase()) ||
        fila.vehiculo.modelo
          .toLowerCase()
          .includes(valorBuscado.toLowerCase()) ||
        repTypes[fila.typeRep-1]
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            valorBuscado
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      );
    });
    setfiltered(filasFiltradas);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Grid
        container
        alignContent={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"90vh"}
      >
        <Paper
          elevation={10}
          square={false}
          sx={{
            position:'relative',
            alignContent:"end",
            width: "95%",
            height: "90%",
            borderRadius: "25px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            width={"95%"}
            margin={'auto'}
            mt={"2%"}
            rowGap={"10px"}
            position={'absolute'}
            zIndex={'10'}
            top={'0%'}
            left={'3%'}
          >
            <Grid item xs={12} sm={5} md={4}>
              <Typography fontWeight={800} variant="h5">
                Reparaciones activas
                <Divider
                  variant="fullWidth"
                  sx={{
                    opacity: 1,
                    background: "black",
                  }}
                ></Divider>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="filled-search"
                label="Buscar reparación"
                type="search"
                size="small"
                variant="outlined"
                onChange={(value) => handleSearch(value.target.value)}
                sx={{
                  width: "100%",
                  background: "rgb(240,240,240)",
                  borderRadius: "5px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>

          <Box
            alignContent={"center"}
            height={"85%"}
            justifyContent={"center"}
          >
            <TableVirtuoso
              style={{ height: "100%", borderRadius: "0 0 25px 25px" }}
              data={filtered}
              components={VirtuosoTableComponents}
              fixedHeaderContent={() => (
                <TableRow
                  style={{
                    background: "white",
                  }}
                >
                  {columns.map((columna, index) => {
                    return (
                      <TableCell
                        sx={{
                          width: columna.width,
                        }}
                        key={index}
                        variant="head"
                        align="center"
                      >
                        {columna.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              )}
              itemContent={(index, reparation) => {
                return (
                  <Fila
                    style={{
                      background: index % 2 == 0 ? "lightgrey" : "white",
                    }}
                    onComplete={() => onCompleteRep(reparation.id)}
                    onCancel={() => onCancelRep(reparation.id)}
                    index={index}
                    key={index}
                    row={reparation}
                  ></Fila>
                );
              }}
            ></TableVirtuoso>
          </Box>
        </Paper>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { height: "70%", borderRadius: "25px" },
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
              {"Nueva Reparación"}
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
              Primero debe registrar el ingreso del vehiculo Si aun no lo hace
              clickee el boton
            </Typography>
            <Link
              to={"newVehicle"}
              style={{ textDecoration: "none", maxWidth: "fit-content" }}
            >
              <Button
                variant="contained"
                sx={{
                  margin: "3px 10px 3px 10px",
                  paddingInline: "5%",
                  backgroundColor: "aqua.main",
                  color: "black.main",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "aqua.main",
                    filter: "brightness(95%)",
                  },
                }}
              >
                Ingresar vehículo
              </Button>
            </Link>
          </Grid>
          <Grid item width={"70%"}>
            <TextField
              // TODO: validar
              required
              fullWidth
              sx={{
                letterSpacing: "200px",
                mb: 4,
              }}
              InputProps={{
                style: { letterSpacing: "20px" },
              }}
              name="patente"
              value={formData.patente}
              onChange={handleChange}
              label="Patente"
              variant="filled"
              size="small"
            />
            <TextField
              select
              required
              label="Selecciona"
              defaultValue={0}
              name="typeRep"
              value={formData.typeRep}
              onChange={handleChange}
              helperText="Seleccione el tipo de reparacion que se le hara al vehiculo ingresado"
              variant="filled"
              size="small"
              fullWidth
            >
              {repTypes.map((option, index) => (
                <MenuItem key={index} value={index}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "pink.main",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "pink.main",
                  filter: "brightness(95%)",
                },
              }}
            >
              Registrar Reparación
            </Button>
          </Grid>
        </Grid>
        <Collapse in={error}>
          <Alert
            sx={{
              zIndex: 10,
              position: "fixed",
              width: "37%",
              bottom: "4%",
            }}
            severity="error"
            onClose={() => {
              setError(false);
            }}
          >
            No se pudo crear la reparación
          </Alert>
        </Collapse>
      </Dialog>

      <Fab
        size="large"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: "4%",
          right: "2%",
          color: "common.white",
          border: "0.5px solid black",
          bgcolor: "aqua.main",
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
    </>
  );
};
export default WorkshopPage;
