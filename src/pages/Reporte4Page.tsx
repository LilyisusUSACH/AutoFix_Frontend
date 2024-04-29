import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import reportesService from "../services/reportes.service";
import { motorType, repTypes } from "../constants";
import { formatCurrency } from "../utils/utils";

const Reporte4Page = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const init = () => {
      reportesService.getR4().then((response) => {
        setDatos(response.data);
      });
    };    init();
  }, []);

  return (
    <>
      <Grid container minHeight={"89vh"} justifyContent={"center"}>
        <Grid item xs={8} md={5} minHeight={"80vh"} marginBlock={"40px"}>
          <Paper
            sx={{
              minHeight: "80vh",
              width: "90%",
              margin: "auto",
              borderRadius: "25px",
              textAlign: "center",
              overflow: "auto",
            }}
          >
            <Typography variant="h4">Reporte 4</Typography>
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
                    <TableCell width={"35%"}>Tipo de reparacion</TableCell>
                    <TableCell width={"25%"} align="center">
                      Tipo de motor
                    </TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Monto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos.map( (column) => (
                    <TableRow>
                    <TableCell>{repTypes[column.type_rep-1]}</TableCell>
                    <TableCell align="center">
                      {motorType[column.tipo_motor].toUpperCase()}
                    </TableCell>
                    <TableCell align="right">{column.count}</TableCell>
                    <TableCell align="right">{formatCurrency(column.monto_total)}</TableCell>
                  </TableRow>
                  ) )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Reporte4Page;
