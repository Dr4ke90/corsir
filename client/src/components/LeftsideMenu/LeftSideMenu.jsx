import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./leftSide-menu.css";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { MODULES } from "../../data/modules";


const LeftSideMenu = () => {
  const user = useSelector((state) => state.users.loggedUser);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (user.module) {
      setModules(user.module.map((modul) => modul));
    } else {
      setModules(MODULES);
    }
  }, [user.module]);

  const itModules = modules.filter((module) =>
    module.departament.includes("it")
  );
  const hrModules = modules.filter((module) =>
    module.departament.includes("hr")
  );
  const tehnicModules = modules.filter((module) =>
    module.departament.includes("tehnic")
  );
  const unicModules = modules.filter((module) =>
    module.departament.includes("unic")
  );

  return (
    <Box className="left-side-menu">
      {unicModules.length > 0 && (
        <Box className="general-modules">
          <hr />
          <h5 style={{ display: "flex", justifyContent: "center" }}>General</h5>
          <hr />
          {unicModules.map((modul) => (
            <Link to={`/${modul.name}`} key={modul.name}>
              <Button variant="contained">{modul.name}</Button>
            </Link>
          ))}
        </Box>
      )}
      {itModules.length > 0 && (
        <Box className="it-modules">
          <hr />
          <h5 style={{ display: "flex", justifyContent: "center" }}>IT</h5>
          <hr />
          {itModules.map((modul) => (
            <Link to={`/${modul.name}-${modul.departament}`} key={modul.name}>
              <Button variant="contained">{modul.name}</Button>
            </Link>
          ))}
        </Box>
      )}
      {hrModules.length > 0 && (
        <Box className="hr-modules">
          <hr />
          <h5 style={{ display: "flex", justifyContent: "center" }}>HR</h5>
          <hr />
          {hrModules.map((modul) => (
            <Link to={`/${modul.name}-${modul.departament}`} key={modul.name}>
              <Button variant="contained">{modul.name}</Button>
            </Link>
          ))}
        </Box>
      )}
      {tehnicModules.length > 0 && (
        <Box className="tehnic-modules">
          <hr />
          <h5 style={{ display: "flex", justifyContent: "center" }}>Tehnic</h5>
          <hr />
          {tehnicModules.map((modul) => (
            <Link to={`/${modul.name}-${modul.departament}`} key={modul.name}>
              <Button variant="contained">{modul.name}</Button>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LeftSideMenu;
