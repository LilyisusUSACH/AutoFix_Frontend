import logoiconBlack from "../assets/logoiconBlack.svg";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const NavBarVariant = () => {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.5)",
        bgcolor: "yellow.main",
      }}
    >
      <Toolbar style={{
        justifyContent:'center'
      }} disableGutters>
        <Box
          paddingTop={1}
        >
          <Link to={"/"}
          style={{
            display: 'flex',
            flexDirection: "column",
            textDecoration: 'none'
          }}
          >
            <img
              style={{ pointerEvents: "none",
                marginBottom:'-10px'
              }}
              src={logoiconBlack}
              height={"40rem"}
            />
            <Typography
              sx={{
                margin: "auto",
                color: "black.main",
              }}
            >
              Inicio
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBarVariant;
