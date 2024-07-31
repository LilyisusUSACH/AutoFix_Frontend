import logoiconYellow from "../assets/logoiconYellow.svg";
import logoiconBlack from "../assets/logoiconBlack.svg";
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
import { drawer } from "../components/drawerOpts";
import { useState } from "react";

const NavBarVariantWork = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0px 1px 2px grey",
        bgcolor: "transparent",
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
          <MenuIcon
            sx={{
              fontSize: 35,
              color: "black.main",
            }}
          />
        </IconButton>
        <Drawer open={open} onClick={toggleDrawer(false)} onClose={toggleDrawer(false)}>
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
              src={logoiconBlack}
              height={"50rem"}
            />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBarVariantWork;
