import { ReactElement, useState } from "react";
import logoiconYellow from "../assets/logoiconYellow.svg";

import CarRepairIcon from "@mui/icons-material/CarRepairOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

type option = {
  text: string;
  icon: ReactElement;
  redirect: string;
};

// incluir el redireccion
export const options: option[] = [
  {
    text: "Reparaciones activas",
    icon: <CarRepairIcon />,
    redirect: "/workshop/",
  },
  {
    text: "Historial Reparaciones",
    icon: <HistoryIcon />,
    redirect: "/workshop/history",
  },
  {
    text: "Historial Recibos",
    icon: <ReceiptLongOutlinedIcon />,
    redirect: "/pos/boletas/",
  },
  {
    text: "Ventas",
    icon: <PaidOutlinedIcon />,
    redirect: "/pos/",
  },
  {
    text: "Bonos",
    icon: <CardGiftcardOutlinedIcon />,
    redirect: "/pos/bonos",
  },
  {
    text: "Ingresar Vehiculo",
    icon: <DirectionsCarOutlinedIcon />,
    redirect: "/workshop/newVehicle",
  },
  {
    text: "Ver Vehiculos",
    icon: <MinorCrashOutlinedIcon />,
    redirect: "/pos/vehiculo/",
  },
];

export const drawer = (
  <Box sx={{ width: 220 }} role="presentation" textAlign={"center"}>
    <Box>
      <Avatar
        src={logoiconYellow}
        sx={{
          boxShadow:
            "0 3px 0.2px 1px rgba(255, 215, 0, 1) , 0px 4px 6px 4px rgba(0,0,0,0.25)",
          bgcolor: "#000000",
          margin: "auto",
          mt: 1,
          objectFit: "scale-down",
          width: "80px",
          height: "80px",
          "& > img": {
            width: "70%",
            objectFit: "contain",
            ml: "-5%",
          },
        }}
      />
      <Typography mt={1.5} variant="h5">
        AutoCareHub
        <br />
        Opciones
      </Typography>
      <Divider
        variant="middle"
        sx={{
          mt: "2%",
          borderBottomWidth: "1px",
          opacity: 1,
          background: "#000000",
        }}
      />
    </Box>
    <List
      sx={{
        "& .MuiSvgIcon-root": {
          fontSize: 45,
          color: "#000000",
        },
      }}
    >
      {options.map((option, index) => (
        <Box key={index}>
          <ListItem key={index} disablePadding>
            <Link to={option.redirect} style={{width:"100%"}}>
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 10,
                    lineHeight: "1",
                  }}
                  primary={option.text}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider
            variant="middle"
            sx={{
              display: index == 0 || index ===  options.length-2 ? "none" : "",
              mt: "2%",
              borderBottomWidth: "1px",
              opacity: index == options.length - 1 ? 1 : 0.5,
              background: "black",
            }}
          />
        </Box>
      ))}
    </List>
  </Box>
);
