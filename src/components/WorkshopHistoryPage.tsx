import {
  Box,
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
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import workshopService from "../services/workshop.service";
import { repTypes } from "../constants";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { Link } from "react-router-dom";
import { Reparation, ColumnData, RegReparation } from "../types/types";
import { formatCurrency, formatDateTime } from '../utils/utils';

const ExpandableRow = ({ context, item: user, ...restProps }) => {
  const isExpanded = context.getIsExpanded(user);
  console.log(user)
  return (
    <>
      <TableRow
        {...restProps}
        onClick={() => context.setIsExpanded(user)}
        style={{
          background: restProps["data-index"] % 2 == 0 ? "lightgrey" : "white",
        }}
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
                    <Link to={"/pos/boletas/" + user.receipt}>
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
                    <Link to={"/pos/vehiculo/" + user.patente}>
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

const VirtuosoTableComponents: TableComponents<RegReparation> = {
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
  // @ts-ignore
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
const Fila = (props: { expanded: boolean; row: RegReparation }) => {
  const { row, expanded } = props;
  //console.log(typeof(onComplete));
  return (
    <>
      <TableCell align="center" component="th" scope="row">
        {row.patente.toUpperCase()}
      </TableCell>
      <TableCell align="center">{row.patente.toUpperCase()}</TableCell>
      <TableCell align="center">{row.patente.toUpperCase()}</TableCell>
      <TableCell align="center">{row.reparation.nombre}</TableCell>
      <TableCell align="center">
        {formatDateTime(row.createdAt)}
      </TableCell>
      <TableCell align="center">
        {row.completedAt
          ? formatDateTime(row.completedAt)
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
  const [filtered, setfiltered] = useState<RegReparation[]>([]);
  const [reparations, setReparations] = useState<RegReparation[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

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
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (valorBuscado: string) => {
    const filasFiltradas = reparations.filter((fila) => {
      return (
        fila.patente
          .toLowerCase()
          .includes(valorBuscado.toLowerCase()) ||
        fila.reparation?.nombre
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
