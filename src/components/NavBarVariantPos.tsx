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
import { useState } from "react";
import { drawer, options } from "../components/drawerOpts.tsx";
const NavBarVariantPos = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
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
        <Drawer open={open} onClick={toggleDrawer(false)}  onClose={toggleDrawer(false)}>
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
