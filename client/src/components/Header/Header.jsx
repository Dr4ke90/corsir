import React from "react";
import "./dep-menu.css";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/usersSlice";
import img from "../../resources/brand.png";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedUser);

  return (
    <div className="main-menu">
      <Box
        sx={{
          display: "flex",
          width: "47%",
        }}
      >
        <img src={img} alt="Coral" />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "end",
          justifyContent: "flex-end",
          width: "47%",
        }}
      >
        {/* <h3 style={{ color: "purple" }}></h3> */}

        <Typography variant="h5" component="h5" >
          {user.nume}
        </Typography>

        <Button variant="outlined" onClick={() => dispatch(logOut())}>
          LogOut
        </Button>
      </Box>
    </div>
  );
};

export default Header;
