import {
  Autocomplete,
  Box,
  Button,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { adaugaUser, updateUser } from "../../redux/slices/usersSlice";
import PermisionsTable from "../../components/PermisionsTable/PermisionsTable";
import { hashPassword } from "../../utils/hashPassword";
import { createFileNumber } from "../../utils/createFileNumber";
import { EMPLOYEE_INITIAL_STATE } from "./Data/employeeInitialState";
import bcrypt from "bcryptjs";

const ModalCreateUsers = ({ open, dialogProps }) => {
  const { handleOpenCreateModal, selectedFile, setIsOnEditMode, isOnEditMode } =
    dialogProps;
  const locations = useSelector((state) => state.locatii);
  const loggedUser = useSelector((state) => state.users.loggedUser);
  const allUsers = useSelector((state) => state.users.allUsers);
  const [selectedUser, setSelectedUser] = useState(EMPLOYEE_INITIAL_STATE);

  const dispatch = useDispatch();
  const [moduleUpdates, setModuleUpdates] = useState([]);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFile) {
      setSelectedUser(selectedFile);
    } else {
      setSelectedUser(null);
    }
  }, [selectedFile]);

  const handleChangeUserFields = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelectedUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const setUserModuleUpdates = (moduleUpdates) => {
    setModuleUpdates(moduleUpdates);
  };

  const handleUserUpdates = async () => {
    let updates = { ...selectedUser, module: [...moduleUpdates] };

    const isMatch = await bcrypt.compare(
      selectedUser.password,
      selectedFile.password
    );

    if (!isMatch) {
      const hashedPassword = await hashPassword(updates.password);
      updates = {
        ...updates,
        password: hashedPassword,
      };
    } else {
      delete updates.password;
    }

    dispatch(updateUser(updates));

    setSelectedUser(EMPLOYEE_INITIAL_STATE);
    handleOpenCreateModal();
  };

  const handleCeateUser = () => {
    dispatch(
      adaugaUser({
        ...selectedUser,
        fisa: createFileNumber(allUsers.slice().reverse(), ""),
      })
    );

    setSelectedUser(EMPLOYEE_INITIAL_STATE);
    handleOpenCreateModal();
  };

  return (
    <Dialog
      open={open}
      maxWidth={loggedUser.superuser && isOnEditMode ? "md" : "xs"}
      fullWidth={true}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <TextField
              name="nume"
              label="Nume"
              onChange={handleChangeUserFields}
              value={selectedUser.nume || ""}
            />
            <TextField
              name="email"
              label="Email"
              onChange={handleChangeUserFields}
              value={selectedUser.email || ""}
            />
            <TextField
              name="tel"
              label="Telefon"
              onChange={handleChangeUserFields}
              value={selectedUser.tel || ""}
            />
            <TextField
              name="functie"
              label="Functie"
              onChange={handleChangeUserFields}
              value={selectedUser.functie || ""}
            />
            <Autocomplete
              options={locations.map((loc) => loc.proiect)}
              renderInput={(params) => (
                <TextField {...params} label="Locatie" variant="outlined" />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSelectedUser((prev) => {
                    return {
                      ...prev,
                      locatie: newValue,
                    };
                  });
                }
              }}
              value={selectedUser.locatie || ""}
            />
            <TextField
              select
              label="Stare"
              name="stare"
              variant="outlined"
              value={selectedUser.stare || ""}
              onChange={handleChangeUserFields}
            >
              {["Activ", "Demis"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <hr />

            {loggedUser.superuser && isOnEditMode && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <TextField
                  name="username"
                  label="Username"
                  onChange={handleChangeUserFields}
                  value={selectedUser.username || ""}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  onChange={handleChangeUserFields}
                  value={selectedUser.password || ""}
                />
              </Box>
            )}
          </Box>

          {loggedUser.superuser && isOnEditMode && (
            <Box sx={{ width: "100%" }}>
              <PermisionsTable
                modules={selectedUser.module}
                setUserModuleUpdates={setUserModuleUpdates}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: "50px" }}
          onClick={() => {
            handleOpenCreateModal();
            setIsOnEditMode(false);
            setSelectedUser(EMPLOYEE_INITIAL_STATE);
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ width: "50px" }}
          onClick={isOnEditMode ? handleUserUpdates : handleCeateUser}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCreateUsers;
