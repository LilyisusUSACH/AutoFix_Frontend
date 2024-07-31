import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

import { Box, Button, Paper, TableCell } from "@mui/material";
import { useState } from "react";
import reportesService from "../services/reportes.service";
import { RepOneReg } from "../types/types";
import { AxiosResponse } from "axios";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { formatCurrency } from "../utils/utils";

//TODO: enqueque snackbar
const ReportOnePage = () => {
  const [date, setDate] = useState(dayjs());
  const [report, setReport] = useState<RepOneReg[]>([]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
      <Paper
        elevation={8}
        sx={{
          display: "grid",
          height: "85vh",
          maxWidth: "100%",
          placeSelf: "center",
          borderRadius: "25px",
          textAlign: "center",
          gridTemplateRows: "min-content 1fr",
        }}
      >
        <form
          className="dateForm"
          style={{
            display: "grid",
            maxWidth: "100vw",
            gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "min-content min-content",
            padding: "1vh 3vw",
          }}
        >
          <h1 style={{ gridColumn: "1/-1" }}>
            Selecciona la fecha para el reporte
          </h1>
          <DatePicker
            views={["year", "month"]}
            maxDate={dayjs()}
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
          <Button
            className="buttonForDate"
            variant="outlined"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              reportesService
                .getR1(date.month() + 1, date.year())
                .then((response: AxiosResponse<RepOneReg[], any>) => {
                  setReport(response.data);
                });
            }}
          >
            Consultar
          </Button>
        </form>
        <Box
          sx={{
            overflowY: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lista reparaciones</TableCell>
                <TableCell>Sedan</TableCell>
                <TableCell>Hatchback</TableCell>
                <TableCell>Suv</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Furgoneta</TableCell>
                <TableCell>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(report).map((rep) => (
                <TableRow key={rep.name}>
                  <TableCell>{rep.name}</TableCell>
                  <TableCell align="right">
                    {rep.sedan.count}
                    <hr />
                    {formatCurrency(rep.sedan.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {rep.hatchback.count} <hr />
                    {formatCurrency(rep.hatchback.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {rep.suv.count} <hr />
                    {formatCurrency(rep.suv.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {rep.pickup.count} <hr />
                    {formatCurrency(rep.pickup.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {rep.furgoneta.count} <hr />
                    {formatCurrency(rep.furgoneta.amount)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "800" }}>
                    {rep.total.count} <hr />
                    {formatCurrency(rep.total.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default ReportOnePage;
