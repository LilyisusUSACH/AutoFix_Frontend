import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import WorkshopRouter from "./routers/WorkshopRouter";
import ClientRouter from "./routers/ClientRouter";
import MyVehicleRouter from "./routers/MyVehicleRouter";
import PosRouter from "./routers/PosRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Workshop/*" element={<WorkshopRouter />} />
        <Route path="/Pos/*" element={<PosRouter />} />
        <Route path="/MyVehicle/*" element={<MyVehicleRouter />} />
        <Route path="/*" element={<ClientRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
