import {
  Button,
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
import { Link } from "react-router-dom";
import { formatCurrency } from '../utils/utils';

const Reporte1Page = () => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const init = () => {
      reportesService.getR1().then((response) => {
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
            <Typography variant="h4">Reporte 1</Typography>
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
                    <TableCell width={"30%"}>ID Vehiculo</TableCell>
                    <TableCell>Patente</TableCell>
                    <TableCell align="right">Gastado (pagado)</TableCell>
                    <TableCell width={"30%"} align="center">
                      Ver detalles
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos.map((column) => (
                    <TableRow key={column.id}>
                      <TableCell>{column.id}</TableCell>
                      <TableCell>{column.patente.toUpperCase()}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(column.gastado_por_vehiculo)}
                      </TableCell>
                      <TableCell align="center">
                        <Link to={"/pos/vehiculo/"+column.id}>
                          <Button size="small" variant="contained">
                            Ver detalles
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
    </>
  );
};
export default Reporte1Page;
