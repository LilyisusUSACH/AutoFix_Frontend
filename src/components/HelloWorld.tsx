import { useState } from "react";
import { Box, Grid } from "@mui/material";
import backImg from "../assets/engranaje.png";
import "./a.css";

const HelloWorld = ({children}) => {
  const [isDowning, setIsDowning] = useState(false);

  const handleOnMove = () => {
    setIsDowning(!isDowning);
  };

  return (
    <Grid container
    height={'100%'}
    >
      <Grid item xs={4} md={2} xl={1}
      >
        <Box
          onMouseEnter={handleOnMove}
          sx={{
            zIndex: "0",
            position: 'sticky',
            marginLeft: '-13rem',
            top: "20%",
          }}
        >
          <img
            style={{
              width: "23rem",
              pointerEvents: "none",
            }}
            className={`lala ${isDowning ? "rotateDown" : "rotateUp"}`}
            src={backImg}
          />
        </Box>
      </Grid>
      <Grid item xs={8} md={9} xl={11}
      style={{
        minHeight: "90vh",
      }}>
            {children}
        </Grid>
      </Grid>
  );
};
export default HelloWorld;
