import {
  Box,
  Button,
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
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { TableComponents, TableVirtuoso } from "react-virtuoso";
import { ColumnData, ColumnDataWidth, Receipt } from "../types/types";
import receiptService from "../services/receipt.service";
import { formatCurrency } from "../utils/utils";
import { Link } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Fila = ({ item: row, ...restProps }) => {
  return (
    <TableRow
      {...restProps}
      sx={{
        background: restProps["data-index"] % 2 == 0 ? "lightgrey" : "white",
      }}
    >
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.patente.toUpperCase()}</TableCell>
      <TableCell align="center">{row.regReparations?.length}</TableCell>
      <TableCell align="center">{row.bono ? "Si" : "No"}</TableCell>
      <TableCell align="center">{row.deliveredAt ? "Si" : "No"}</TableCell>
      <TableCell style={{ fontWeight: "800" }} align="center">
        {row.deliveredAt ? formatCurrency(row.total) : "Aun pendiente"}
      </TableCell>
      <TableCell align="center">
        <Link to={"/pos/boletas/" + row.id}>
          <IconButton
            size="medium"
            aria-label="complete"
            sx={{
              borderRadius: "40px",
              backgroundColor: "#00A3FFc0",
              width: "60px",
              height: "40px",
              color: "white",
              "&:hover": {
                backgroundColor: "#00A3FFA0",
                filter: "brightness(120%)",
              },
            }}
          >
            <InfoOutlinedIcon fontSize="large" />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
};

const VirtuosoTableComponents: TableComponents<Receipt> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Box} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} sx={{ borderCollapse: "separate" }} />,
  TableHead,
  TableRow: Fila,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const columns: ColumnData[] = [
  {
    label: "ID",
  },
  {
    label: "Patente",
  },
  {
    label: "Cantidad de reparaciones",
  },
  {
    label: "Bono",
  },
  {
    label: "Pagado",
  },
  {
    label: "Costo Total",
  },
  {
    label: "Ir al recibo",
  },
];

const ReceiptHistoryPage = () => {
  const [filtered, setfiltered] = useState<Receipt[]>([]);
  const [reparations, setReparations] = useState<Receipt[]>([]);

  const init = () => {
    receiptService
      .getReceipts()
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
        (fila.patente
          ? fila.patente.toLowerCase().includes(valorBuscado.toLowerCase())
          : "") || fila.id.toString().includes(valorBuscado)
      );
    });
    setfiltered(filasFiltradas);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Grid className="boletas-grid">
        <Paper
          className= "boletas-paper"
          elevation={10}
          sx={{
            height: "90%",
            display: "grid",
            columnGap: "20px",
            borderRadius: "25px",
            overflow: "clip",
            paddingTop: "1rem",
          }}
        >
          <Typography
            fontWeight={800}
            variant="h5"
          >
            Historial de boletas
            <Divider
              variant="fullWidth"
              sx={{
                opacity: 1,
                background: "black",
              }}
            ></Divider>
          </Typography>
          <TextField
            id="filled-search"
            label="Buscar por patente"
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

          <TableVirtuoso
            style={{ gridColumn: "1 / -1"   }}
            data={filtered}
            components={VirtuosoTableComponents}
            overscan={5}
            fixedHeaderContent={() => (
              <TableRow
                style={{
                  background: "white",
                }}
              >
                {columns.map((columna, index) => {
                  return (
                    <TableCell key={index} variant="head" align="center">
                      {columna.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            )}
          ></TableVirtuoso>
        </Paper>
      </Grid>
    </>
  );
};
export default ReceiptHistoryPage;
