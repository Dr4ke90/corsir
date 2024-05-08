import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboad/Dashboard";
import ItEquipment from "../pages/ItEquipment/ItEquipment";
import SupplyChecklist from "../pages/SupplyChecklist/SupplyChecklist";
import Locations from "../pages/Locations/Locations";
import Inventory from "../pages/ItInventory/Inventory";
import Return from "../pages/Return/Return";
import Handover from "../pages/Handover/Handover";
import Employees from "../pages/Employees/Employees";
import MobilePhones from "../pages/MobilePhones/MobilePhones";


const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path={`/`} element={<Dashboard />} />
      <Route path="/echipament-it" element={<ItEquipment />} />
      <Route path="/predare" element={<Handover />} />
      <Route path="/retur" element={<Return />} />
      <Route path="/necesar" element={<SupplyChecklist />} />
      <Route path="/inventar-it" element={<Inventory />} />
      <Route path="/angajati" element={<Employees />} />
      <Route path="/locatii" element={<Locations />} />
      <Route path="/telefoane-it" element={<MobilePhones />} />
    </Routes>
  );
};

export default AppRoutes;
