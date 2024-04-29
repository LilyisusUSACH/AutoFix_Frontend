import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import MenuItem from "@mui/material/MenuItem";
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
import { formatCurrency } from "../utils/utils";

// TODO: Separar Por componentes lo que se pueda

const ExpandableRow = ({ context, item: user, ...restProps }) => {
  //console.log(user)
  const isExpanded = context.getIsExpanded(user);
  return (
    <>
      <TableRow
        {...restProps}
        onClick={() => context.setIsExpanded(user)}
        style={{
          background: restProps["data-index"] % 2 == 0 ? "lightgrey" : "white",
        }}
        key={user.id}
      >
        <Fila expanded={isExpanded} row={user}></Fila>
      </TableRow>
      <TableRow
        style={{
          backgroundColor:
            restProps["data-index"] % 2 == 0 ? "lightgrey" : "white",
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid
                item
                xs={2}
                style={{
                  marginBlock: "auto",
                }}
                textAlign={"center"}
              >
                <Typography variant="h4">Detalles</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                container
                direction={"column"}
                textAlign={"center"}
              >
                <Grid container justifyContent={"space-around"}>
                  <Grid item xs={2}>
                    <Typography variant="h5">Ver recibo</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="h5"
                      style={{
                        margin: "auto",
                      }}
                    >
                      Ver vehiculo
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="h5"
                      style={{
                        margin: "auto",
                      }}
                    >
                      Costo Reparacion
                    </Typography>
                  </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container justifyContent={"space-around"}>
                  <Grid item xs={2}>
                    <Link to={"/pos/boletas/" + user.receipt_id}>
                      <IconButton
                        sx={{
                          margin: "auto",
                          my: "10px",
                          width: "fit-content",
                          border: "1px solid black",
                          color: "#000000FF",
                          backgroundColor: "#25D8B7",
                          "&:hover": {
                            backgroundColor: "#25D8B7",
                            filter: "brightness(90%)",
                          },
                        }}
                      >
                        <ReceiptLongIcon fontSize="large" />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Link to={"/pos/vehiculo/" + user.vehiculo.id}>
                      <IconButton
                        sx={{
                          margin: "auto",
                          my: "10px",
                          width: "fit-content",
                          border: "1px solid black",
                          color: "#000000FF",
                          backgroundColor: "#FF4090",
                          "&:hover": {
                            backgroundColor: "#FF4090",
                            filter: "brightness(90%)",
                          },
                        }}
                      >
                        <CarRepairIcon fontSize="large" />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="h5"
                      style={{
                        margin: "auto",
                      }}
                    >
                      {formatCurrency(user.montoTotal)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

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
  TableRow: ExpandableRow,
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
    width: 80,
    label: "Fecha Termino",
  },
  {
    width: 40,
    label: "",
  },
];
// TODO: poner botones y crear los update / delete
// TODO: arreglar fuentes
const Fila = (props: { expanded: boolean; row: Reparation }) => {
  const { row, expanded } = props;
  //console.log(typeof(onComplete));
  return (
    <>
      <TableCell align="center" component="th" scope="row">
        {row.vehiculo.patente.toUpperCase()}
      </TableCell>
      <TableCell align="center">{row.vehiculo.marca.toUpperCase()}</TableCell>
      <TableCell align="center">{row.vehiculo.modelo.toUpperCase()}</TableCell>
      <TableCell align="center">{repTypes[row.typeRep - 1]}</TableCell>
      <TableCell align="center">
        {row.fechaIngreso + " " + row.horaIngreso.slice(0, 5)}
      </TableCell>
      <TableCell align="center">
        {row.fechaSalida
          ? row.fechaSalida + " " + row.horaSalida
          : "Aun en taller"}
      </TableCell>
      <TableCell align="center">
        <IconButton
          sx={{
            marginBlock: "-10px",
            backgroundColor: expanded ? "#5CD000" : "#00A3FFc0",
            color: "white",
            "&:hover": {
              backgroundColor: "#00A3FFA0",
              filter: "brightness(120%)",
            },
          }}
          aria-label="info"
          size="small"
        >
          <InfoOutlinedIcon fontSize="large" />
        </IconButton>
      </TableCell>
    </>
  );
};

const WorkshopHistoryPage = () => {
  const [filtered, setfiltered] = useState<Reparation[]>([]);
  const [reparations, setReparations] = useState<Reparation[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [openRow, setOpenRow] = useState(false);

  const handleScroll = () => {
    console.log("handleScroll");
    setExpandedIds([]);
  };

  const getIsExpanded = (rep: Reparation) => expandedIds.includes(rep.id);

  const onIsExpandedChange = (rep: Reparation) => {
    if (getIsExpanded(rep)) {
      setExpandedIds(expandedIds.filter((id) => id !== rep.id));
    } else {
      setExpandedIds([...expandedIds, rep.id]);
    }
  };

  const init = () => {
    workshopService
      .getReparations()
      .then((response) => {
        setReparations(response.data);
        setfiltered(response.data);
        //console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (valorBuscado: string) => {
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
        repTypes[fila.typeRep - 1]
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
            position: "relative",
            alignContent: "end",
            width: "95%",
            height: "90%",
            borderRadius: "25px",
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            width={"95%"}
            margin={"auto"}
            mt={"2%"}
            rowGap={"10px"}
            position={"absolute"}
            zIndex={"10"}
            top={"0%"}
            left={"3%"}
          >
            <Grid item xs={12} sm={5} md={4}>
              <Typography fontWeight={800} variant="h5">
                Historial Reparaciones
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

          <Box alignContent={"center"} height={"85%"} justifyContent={"center"}>
            <TableVirtuoso
              style={{ height: "100%", borderRadius: "0 0 25px 25px" }}
              data={filtered}
              components={VirtuosoTableComponents}
              overscan={5}
              onScroll={handleScroll}
              context={{
                getIsExpanded: getIsExpanded,
                setIsExpanded: onIsExpandedChange,
              }}
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
            ></TableVirtuoso>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};
export default WorkshopHistoryPage;
