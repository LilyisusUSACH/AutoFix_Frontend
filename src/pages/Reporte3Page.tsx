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

const Reporte3Page = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const init = () => {
      reportesService.getR3().then((response) => {
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
            <Typography variant="h4">Reporte 3</Typography>
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
                    <TableCell align="center">
                      Promedio de tiempo de reparacion
                    </TableCell>
                    <TableCell align="center">Marca</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datos.map((column, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {column.promedio_reparacion.replace("days","Dias")}
                      </TableCell>
                      <TableCell align="center">{column.marca.toUpperCase()}</TableCell>
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
export default Reporte3Page;
