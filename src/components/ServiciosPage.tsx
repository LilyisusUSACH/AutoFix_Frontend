import { Grid } from "@mui/material";
import CardServicios from "./CardServicios";
import { repTypes } from "../constants";

type servicio = {
  title: string;
  img: string;
  info: string;
};

const servicios: servicio[] = [
  {
    title: repTypes[0],
    img: "/src/assets/imgs/ReparacionFrenos.jpg",
    info: "Incluye el reemplazo de pastillas de freno, discos, tambores, líneas de freno y reparación o reemplazo del cilindro maestro de frenos",
  },
  {
    title: repTypes[1],
    img: "/src/assets/imgs/SistemaRefrigeracion.jpg",
    info: "Reparación o reemplazo de radiadores, bombas de agua, termostatos y mangueras, así como la solución de problemas de sobrecalentamiento",
  },
  {
    title: repTypes[2],
    img: "/src/assets/imgs/ReparandoMotor.jpg",
    info: " Desde reparaciones menores como el reemplazo de bujías y cables, hasta reparaciones mayores como la reconstrucción del motor o la reparación de la junta de la culata",
  },
  {
    title: repTypes[3],
    img: "/src/assets/imgs/TransmisionAuto.jpg",
    info: "Incluyen la reparación o reemplazo de componentes de la transmisión manual o automática, cambios de líquido y solución de problemas de cambios de marcha",
  },
  {
    title: repTypes[4],
    img: "/src/assets/imgs/ElectricidadAuto.jpg",
    info: "Solución de problemas y reparación de alternadores, arrancadores, baterías y sistemas de cableado, así como la reparación de componentes eléctricos como faros, intermitentes y sistemas de entretenimiento",
  },
  {
    title: repTypes[5],
    img: "/src/assets/imgs/TubosEscape.jpg",
    info: "Incluye el reemplazo del silenciador, tubos de escape, catalizador y la solución de problemas relacionados con las emisiones",
  },
  {
    title: repTypes[9],
    img: "/src/assets/imgs/SistemaCombustible.jpeg",
    info: "Limpieza o reemplazo de inyectores de combustible, reparación o reemplazo de la bomba de combustible y solución de problemas de suministro de combustible",
  },
  {
    title: repTypes[7],
    img: "/src/assets/imgs/Suspension.jpeg",
    info: "Reemplazo de amortiguadores, brazos de control, rótulas y reparación del sistema de dirección asistida",
  },
  {
    title: repTypes[8],
    img: "/src/assets/imgs/ACalfeccion.jpeg",
    info: "Incluye la recarga de refrigerante, reparación o reemplazo del compresor, y solución de problemas del sistema de calefacción",
  },
  {
    title: repTypes[10],
    img: "/src/assets/imgs/Parabrisas.jpeg",
    info: "Reparación de pequeñas grietas en el parabrisas o reemplazo completo de parabrisas y ventanas dañadas",
  },
  {
    title: repTypes[6],
    img: "/src/assets/imgs/neumatico.jpeg",
    info: "Reparación de pinchazos, reemplazo de neumáticos, alineación y balanceo de ruedas.",
  },
];

const ServiciosPage = () => {
  return (
    // TODO: revisar interaccion al cambiar aligment
    <Grid container mt={4} mb={5} rowGap={3} justifyContent={"space-around"}>
      {servicios.map((servicio, index) => {
        return (
          <Grid item>
            <CardServicios
              key={index}
              title={servicio.title}
              img={servicio.img}
              info={servicio.info}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default ServiciosPage;
