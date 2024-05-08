import {
  DialogContent,
  Box,
  Button,
  TextField,
  Autocomplete,
  Dialog,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFileNumber } from "../../utils/createFileNumber";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { fetchEchipament } from "../../redux/slices/echipSlice";
import InventarDialogTable from "./InventarDialogTable";
import { addInventoryFile } from "../../redux/slices/inventarSlice";
import { formatDate } from "../../utils/formatDate";
import { INVOICE_INITIAL_STATE } from "../../data/invoiceInitialState";
import { IT_EQUIPMENT_INITIAL_STATE } from "../ItEquipment/Data/itEquipmentInitialState";
import { fetchAllUsers } from "../../redux/slices/usersSlice";

const ModalInventar = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.locatii);
  const equipment = useSelector((state) => state.echipament);
  const employees = useSelector((state) => state.users.allUsers);

  const [inventoryState, setInventoryState] = useState(INVOICE_INITIAL_STATE);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectedCit, setSelectedCit] = useState(IT_EQUIPMENT_INITIAL_STATE);

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchEchipament());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setInventoryState((prev) => {
      return {
        ...prev,
        data: formatDate(new Date()),
        fisa: createFileNumber(data, "INV"),
        stare: "Creat",
      };
    });
  }, [data]);

  useEffect(() => {
    if (selectedLocation === null) return;

    const filteredEquipment = equipment
      .filter((eq) => eq.locatie === selectedLocation)
      .map((eq) => eq.cit);

    if (filteredEquipment.length === 0) {
      setInventoryState({ ...inventoryState, echipament: [] });
    }

    setInventoryState((prev) => {
      return {
        ...prev,
        echipament: [...filteredEquipment],
      };
    });
  }, [selectedLocation, equipment, inventoryState]);

  const handleCreateInventoryFile = () => {
    if (
      inventoryState.responsabil === "" ||
      inventoryState.echipament.length === 0
    )
      return;

    dispatch(
      addInventoryFile({
        ...inventoryState,
        locatie: selectedLocation ? selectedLocation : "",
      })
    );
    handleOpenCreateModal();
  };

  const handleSelectionChange = (event, newValue) => {
    if (newValue === null) return;
    setSelectedCit(equipment.find((item) => item.cit === newValue));
  };

  const handleAdaugaEchipament = () => {
    setInventoryState((prev) => {
      return {
        ...prev,
        echipament: [...prev.echipament, selectedCit.cit],
      };
    });
  };

  const dialogTableProps = {
    data: inventoryState.echipament,
  };

  return (
    <Dialog open={open} maxWidth="lg" fullWidth={true}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "40%",
                display: "flex",
                gap: "10px",
              }}
            >
              <TextField
                variant="outlined"
                readOnly
                value={inventoryState.fisa}
                label="Fisa"
                size="small"
                style={{ width: "50%" }}
                sx={{
                  textAlign: "center",
                  "& input": {
                    color: "black",
                    textAlign: "center",
                    fontWeight: "bold",
                    backgroundColor: "aliceblue",
                  },
                }}
              />
              <TextField
                variant="outlined"
                readOnly
                value={inventoryState.data}
                label="Data"
                size="small"
                style={{ width: "50%" }}
                sx={{
                  textAlign: "center",
                  "& input": {
                    color: "black",
                    textAlign: "center",
                    fontWeight: "bold",
                    backgroundColor: "aliceblue",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            width="20%"
            marginRight="20px"
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Autocomplete
              options={employees.map((employee) => employee.nume)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  size="small"
                  label="Responsabil"
                />
              )}
              value={inventoryState.responsabil}
              onChange={(event, newValue) => {
                if (newValue) {
                  setInventoryState((prev) => {
                    return {
                      ...prev,
                      responsabil: newValue,
                    };
                  });
                }
              }}
            />
            <Autocomplete
              options={locations.map((loc) => loc.proiect)}
              renderInput={(params) => (
                <TextField {...params} label="Locatie" variant="standard" />
              )}
              value={selectedLocation}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSelectedLocation(newValue);
                }
              }}
            />
            <hr />
            <Box>
              <Box>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  sx={{ marginTop: "5px" }}
                  options={equipment.map((eq) => eq.cit)}
                  renderInput={(params) => (
                    <TextField {...params} label="CIT" />
                  )}
                  onChange={handleSelectionChange}
                  size="small"
                />
                <TextField
                  variant="standard"
                  label="Tip"
                  sx={{ marginTop: "15px", width: "100%" }}
                  value={selectedCit.tip}
                  disabled
                />
                <TextField
                  variant="standard"
                  label="Model"
                  sx={{ width: "100%" }}
                  value={selectedCit.model}
                  disabled
                />
                <TextField
                  variant="standard"
                  label="Serie"
                  sx={{ width: "100%" }}
                  value={selectedCit.serie}
                  disabled
                />
              </Box>

              <Button
                style={{ marginTop: "10px" }}
                variant="outlined"
                onClick={handleAdaugaEchipament}
              >
                Adauga
              </Button>
            </Box>
          </Box>

          <InventarDialogTable dialogTableProps={dialogTableProps} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: "50px" }}
          onClick={() => handleOpenCreateModal()}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ width: "50px" }}
          onClick={() => handleCreateInventoryFile()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalInventar;
