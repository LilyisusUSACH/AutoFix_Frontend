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
import { repTypes, vehicleTypes } from "../constants";
import { formatCurrency } from '../utils/utils';

const Reporte2Page = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const init = () => {
      reportesService.getR2().then((response) => {
        setDatos(response.data);
      });
    };
    init();
  }, []);

  return (
    <>
      <Grid container minHeight={"89vh"} justifyContent={"center"}>
        <Grid item xs={8} md={5} minHeight={"80vh"} marginBlock={"40px"}>
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
            <Typography variant="h4">Reporte 2</Typography>
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
                    <TableCell width={"30%"}>Tipo Reparacion</TableCell>
                    <TableCell align="center">Tipo Vehiculo</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell width={"25%"} align="center">
                      Monto Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos.map((column, index) => (
                    <TableRow key={index}>
                      <TableCell width={"30%"}>{repTypes[column.tipo_rep-1]}</TableCell>
                      <TableCell align="center">{vehicleTypes[column.tipo_vehiculo].toUpperCase()}</TableCell>
                      <TableCell align="right">{column.cantidad}</TableCell>
                      <TableCell width={"25%"} align="center">
                        {formatCurrency(column.monto_total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Reporte2Page;
