import {
    Card,
    CardActions,
    CardMedia,
    Collapse,
    Divider,
    Icon,
    IconProps,
    Typography,
    styled,
  } from "@mui/material";
  import CardContent from "@mui/material/CardContent";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import * as React from "react";
  
  interface ExpandMoreProps extends IconProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <Icon {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  
  const CardServicios = ({title,img,info} : {title:string, img:string, info:string} ) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (
      <Card
        elevation={6}
        onClick={handleExpandClick}
        sx={{
          width: 320,
          borderRadius: 0,
          cursor: "pointer",
          transition: "box-shadow 0.5s filter 0.3s",
          "&:hover": {
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            filter: "brightness(110%)",
          },
        }}
      >
        <CardMedia
          sx={{
            pointerEvents: "none",
          }}
          component="img"
          height="194"
          image={img}
        ></CardMedia>
        <CardContent>
          <Typography textAlign={"center"} variant="h6" fontSize={"1.1rem"}>
            {title}
          </Typography>
          <Divider
            variant="fullWidth"
            sx={{
              mt: "2%",
              borderBottomWidth: "1px",
              opacity: 1,
              background: "black",
            }}
          />
        </CardContent>
        <CardActions
          sx={{
            mt: "-1.5rem",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize={15}
            fontStyle={"italic"}
            color="#5A5A5A"
            sx={{ textAlign: "center" }}
          >
            {"Ver más"}
          </Typography>
          <ExpandMore expand={expanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Typography
            paragraph
              sx={{
                margin: "-1rem 0 -1rem 0",
              }}
              variant="subtitle2"
            >
              {info}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  };
  export default CardServicios;
  