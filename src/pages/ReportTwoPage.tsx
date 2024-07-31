import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

import { Box, Button, Paper, TableCell } from "@mui/material";
import { useState } from "react";
import reportesService from "../services/reportes.service";
import { RepOneReg, RepTwoReg } from "../types/types";
import { AxiosResponse } from "axios";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { formatCurrency } from "../utils/utils";

dayjs.locale("es-mx");
//TODO: enqueque snackbar
const ReportTwoPage = () => {
  const [date, setDate] = useState(dayjs());
  const [report, setReport] = useState<RepTwoReg[]>([]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                .getR2(date.month() + 1, date.year())
                .then((response: AxiosResponse<RepTwoReg[], any>) => {
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
                <TableCell>Lista reparaciones / MES</TableCell>
                <TableCell>
                  {dayjs()
                    .month(date.month() - 2)
                    .format("MMMM")
                    .toUpperCase()}
                </TableCell>
                <TableCell>% Variacion</TableCell>
                <TableCell>
                  {dayjs()
                    .month(date.month() - 1)
                    .format("MMMM")
                    .toUpperCase()}
                </TableCell>
                <TableCell>% Variacion</TableCell>
                <TableCell>
                  {dayjs().month(date.month()).format("MMMM").toUpperCase()}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(report).map((rep) => (
                <TableRow key={rep.name}>
                  <TableCell>{rep.name}</TableCell>
                  <TableCell align="right">
                    {rep.prevPMonth.count} <hr />
                    {formatCurrency(rep.prevPMonth.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {rep.varTwoQty} <hr />
                    {formatCurrency(rep.varTwoAmount).slice(1)+ "%"}
                  </TableCell>
                  <TableCell align="right">
                    {rep.prevMonth.count} <hr />
                    {formatCurrency(rep.prevMonth.amount)}
                  </TableCell>
                  <TableCell align="right">
                    {rep.varOneQty} <hr />
                    {formatCurrency(rep.varOneAmount).slice(1)+ "%"}
                  </TableCell>
                  <TableCell align="right">
                    {rep.month.count}
                    <hr />
                    {formatCurrency(rep.month.amount)}
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

export default ReportTwoPage;
