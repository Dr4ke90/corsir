import "./main-page.css";
import { Routes, Route } from "react-router-dom";
import LeftSideMenu from "../../components/LeftsideMenu/LeftSideMenu";
import { Box } from "@mui/material";
import AppRoutes from "../../Routes/Routes";
import Header from "../../components/Header/Header";

const MainPage = () => {

  return (
    <Box className="main-page">
      <Header />

      <Box className="content">
        <Box className="menu">
          <Routes>
            <Route path={`/*`} element={<LeftSideMenu />} />
          </Routes>
        </Box>
        <hr />
        <Box className="routes">
          <AppRoutes />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
