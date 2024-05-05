import {
  Box,
  Divider,
  Grid,
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
import { ColumnData, Receipt } from "../types/types";
import receiptService from "../services/receipt.service";
import { formatCurrency } from "../utils/utils";

const VirtuosoTableComponents: TableComponents<Receipt> = {
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
    width: 20,
    label: "ID",
  },
  {
    width: 40,
    label: "Patente",
  },
  {
    width: 40,
    label: "Cantidad de reparaciones",
  },
  {
    width: 20,
    label: "Bono",
  },
  {
    width: 20,
    label: "Retirado",
  },
  {
    width: 20,
    label: "Pagado",
  },
  {
    width: 40,
    label: "Costo Total",
  },
];

const Fila = (props: { style: object; row: Receipt }) => {
  const { style, row } = props;
  return (
    <>
      <TableCell sx={style} align="center" component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell sx={style} align="center">
        {row?.patente?.patente?.toUpperCase()}
      </TableCell>
      <TableCell sx={style} align="center">
        {row.reparaciones?.length}
      </TableCell>
      <TableCell sx={style} align="center">
        {row.bono ? "Si" : "No"}
      </TableCell>
      <TableCell sx={style} align="center">
        {row.retirado ? "Si" : "No"}
      </TableCell>
      <TableCell sx={style} align="center">
        {row.pagado ? "Si" : "No"}
      </TableCell>
      <TableCell sx={style} align="center">
        {row.pagado? formatCurrency(row.costoTotal):"Aun pendiente"}
      </TableCell>
    </>
  );
};

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
      return fila?.patente?.patente
        ? fila.patente.patente
            .toLowerCase()
            .includes(valorBuscado.toLowerCase())
        : "";
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
            width: "50%",
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
                Historial de boletas
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
            </Grid>
          </Grid>

          <Box alignContent={"center"} height={"85%"} justifyContent={"center"}>
            <TableVirtuoso
              style={{ height: "100%", borderRadius: "0 0 25px 25px" }}
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
              itemContent={(index, receipt) => {
                return (
                  <Fila
                    row={receipt}
                    key={index}
                    style={{
                      background: index % 2 == 0 ? "lightgrey" : "white",
                    }}
                  ></Fila>
                );
              }}
            ></TableVirtuoso>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};
export default ReceiptHistoryPage;
