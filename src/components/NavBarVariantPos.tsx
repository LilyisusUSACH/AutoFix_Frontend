import logoiconYellow from "../assets/logoiconYellow.svg";
import logoiconBlack from "../assets/logoiconBlack.svg";
import logoiconWhite from "../assets/logoiconWhite.svg"
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactElement, useState } from "react";
import CarRepairIcon from "@mui/icons-material/CarRepairOutlined";
import HistoryIcon from "@mui/icons-material/History";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
const NavBarVariantPos = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  type option = {
    text: string;
    icon: ReactElement;
    redirect: string;
  };

  // incluir el redireccion
  const options: option[] = [
    {
      text: "Reparaciones activas",
      icon: <CarRepairIcon />,
      redirect: "/workshop/"
    },
    {
      text: "Historial Reparaciones",
      icon: <HistoryIcon />,
      redirect: "/workshop/history"
    },
    {
      text: "Historial Recibos",
      icon: <ReceiptLongOutlinedIcon />,
      redirect: "/pos/boletas/"
    },
    {
      text: "Ventas",
      icon: <PaidOutlinedIcon />,
      redirect: "/pos/"

    },
    {
      text: "Bonos",
      icon: <CardGiftcardOutlinedIcon />,
      redirect: "/pos/bonos"
    },
    {
      text:"Ingresar Vehiculo",
      icon: <DirectionsCarIcon />,
      redirect: "/workshop/newVehicle"
    }
  ];

  const drawer = (
    <Box
      sx={{ width: 220 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      textAlign={"center"}
    >
      <Box>
        <Avatar
          src={logoiconYellow}
          sx={{
            boxShadow:
              "0 3px 0.2px 1px rgba(255, 215, 0, 1) , 0px 4px 6px 4px rgba(0,0,0,0.25)",
            bgcolor: "black",
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
            background: "black",
          }}
        />
      </Box>
      <List sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 45,
          color:'black',
        },
      }}>
        {options.map((option, index) => (
          <Box key={index} onClick={() => navigate(option.redirect)}>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText 
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight:10,
                  lineHeight: '1'
                }}
                  primary={option.text} />
              </ListItemButton>
            </ListItem>
            <Divider
              variant="middle"
              sx={{
                display:(index==0 || index==(options.length-1))?'none':'',
                mt: "2%",
                borderBottomWidth: "1px",
                opacity: (index==(options.length-1))?1:0.5,
                background: "black",
              }}
            />
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0px 3px 20px #00000050",
        bgcolor: "#1EBD96",
      }}
    >
      <Toolbar
        style={{
          justifyContent: "center",
        }}
        disableGutters
      >
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2, position: "absolute", left: "10%" }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{
            fontSize: 35,
            color:'white',
          }}/>
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
        <Box>
          <Link
            to={"/workshop"}
            style={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
            }}
          >
            <img
              style={{ pointerEvents: "none" }}
              src={logoiconWhite}
              height={"50rem"}
            />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBarVariantPos;
