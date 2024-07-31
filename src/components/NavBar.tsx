import logoiconYellow from "../assets/logoiconYellow.svg";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const pages = ["servicios", "contactos"];

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.5)",
        bgcolor: "black.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
              minWidth: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {pages.map((page) => (
                <Link key={page} to={`/` + page}>
                  <Button key={page} sx={{ marginX: 1 }}>
                    <Typography
                      sx={{
                        color: "white.main",
                        "&:hover": {
                          color: "yellow.main",
                          textDecoration: "underline",
                          textUnderlineOffset: "10px",
                        },
                      }}
                    >
                      {page}
                    </Typography>
                  </Button>
                </Link>
              ))}
            </Box>
            <Link to={"/"}>
              <img
                style={{marginTop:"2px",marginRight: "10px", pointerEvents: "none" }}
                src={logoiconYellow}
              />
            </Link>
              <Button
                variant="contained"
                onClick={() => {
                  navigate('/myVehicle')
                }}
                sx={{
                  marginY: "10px",
                  borderRadius: "1rem",
                  backgroundColor: "yellow.main",
                  color: "yellow.main",
                  mr: {
                    xs: "0",
                    md: "5%",
                  },
                  "&:hover": {
                    backgroundColor: "#aaaaaa",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    color: "black.main",
                    "&:hover": {
                      color: "yellow.main",
                      textDecoration: "underline",
                      textUnderlineOffset: "7px",
                    },
                  }}
                >
                  Mi Vehiculo
                </Typography>
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
