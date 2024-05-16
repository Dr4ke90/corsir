import {
  Autocomplete,
  Box,
  Button,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
} from "@mui/material";
import HandoverCreateModalTable from "./HandoverCreateModalTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createFileNumber } from "../../utils/createFileNumber";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { handleFetchFile } from "../../utils/fetchDoecument";
import { addFisaPredare } from "../../redux/slices/predareSlice";
import { formatDate } from "../../utils/formatDate";
import { fetchAllUsers } from "../../redux/slices/usersSlice";
import { HANDOVER_FILE_INITIAL_STATE } from "./Data/handoverFileInitialState";
import { fetchWorkEquipmentList } from "../../redux/slices/workEquipmentSlice";
import { WORK_EQUIPMENT_INITIAL_STATE } from "../WorkEquipment/Data/workEquipmentInitialState";
import { handoverValidateInputs } from "./Func/handoverValidateInputs";
import { useHandoverUpdateEmployee } from "./Func/useHandoverUpdateEmployee";
import { useHandoverUpdateEquipment } from "./Func/useHandoverUpdateEquipment";

const HandoverCreateModalWEq = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;

  const dispatch = useDispatch();
  const handoverUpdateEmployee = useHandoverUpdateEmployee();
  const handoverUpdateEquipment = useHandoverUpdateEquipment();

  const angajati = useSelector((state) => state.users.allUsers);
  const locatii = useSelector((state) => state.locatii);
  const workEquipment = useSelector((state) => state.workEquipmentList);

  const user = useSelector((state) => state.users.loggedUser);

  const [fisa, setFisa] = useState(HANDOVER_FILE_INITIAL_STATE);
  const [selectedCit, setSelectedCit] = useState(WORK_EQUIPMENT_INITIAL_STATE);

  const [validationErrors, setValidationErrors] = useState({});

  const [addedEquipment, setAddedEquipment] = useState([]);

  const fileUrl =
    "http://localhost:3000/coral/it/templates/predare-echip-lucru.docx";

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchAllUsers());
    dispatch(fetchWorkEquipmentList());
  }, [dispatch]);

  useEffect(() => {
    setFisa((prevFisa) => ({
      ...prevFisa,
      fisa: createFileNumber(data, "P"),
      data: formatDate(new Date()),
      predator: user.nume,
    }));
  }, [data, user.nume]);

  useEffect(() => {
    setAddedEquipment(() => {
      const updatedList = workEquipment
        .map((eq) => {
          const matchingItem = fisa.echipament.find(
            (item) => item.id === eq.id
          );
          if (matchingItem) {
            return {
              ...eq,
              cantitate: matchingItem.cantitate,
            };
          }
          return eq;
        })
        .filter((eq) => fisa.echipament.some((item) => item.id === eq.id));
      return updatedList;
    });
  }, [fisa.echipament, workEquipment]);

  useEffect(() => {
    if (fisa.primitor !== "") {
      setFisa((prev) => {
        return {
          ...prev,
          locatie: angajati.find((a) => a.nume === prev.primitor).locatie,
        };
      });
    } else {
      return;
    }
  }, [fisa.primitor, angajati]);

  const handleCreateFile = async () => {
    if (fisa.echipament.length === 0) return;

    let response = await dispatch(addFisaPredare(fisa));

    if (response.meta.requestStatus === "fulfilled") {
      handoverUpdateEquipment(workEquipment, fisa);

      handoverUpdateEmployee(angajati, fisa);

      handleFetchFile(fileUrl, { ...fisa, echipament: [...addedEquipment] });
    } else {
      throw new Error("Adaugarea fisei nu a avut succes");
    }

    setFisa(HANDOVER_FILE_INITIAL_STATE);
    handleOpenCreateModal();
  };

  const handleSelectionChange = (event, newValue) => {
    if (newValue === null) return;

    const selectedItem = workEquipment.find((item) => item.id === newValue);
    if (selectedItem) {
      setSelectedCit(selectedItem);
    } else {
      return;
    }
  };

  const handleAdaugaEchipament = () => {
    const newValidationErrors = handoverValidateInputs(selectedCit);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    setFisa((prev) => {
      const findItem = prev.echipament.find((id) => id === selectedCit.id);
      if (findItem) return prev;

      return {
        ...prev,
        echipament: [
          ...prev.echipament,
          { id: selectedCit.id, cantitate: selectedCit.cantitate },
        ],
      };
    });

    setSelectedCit(WORK_EQUIPMENT_INITIAL_STATE);
  };

  const handleRemoveEquipment = (itemID) => {
    setFisa((prev) => {
      return {
        ...prev,
        echipament: prev.echipament.filter((item) => item.id !== itemID),
      };
    });
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;

    setSelectedCit((prev) => {
      return {
        ...prev,
        cantitate: value,
      };
    });
  };

  const dialogTableProps = {
    addedEquipment,
    handleRemoveEquipment,
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
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
          <Box width={"35%"}>
            <TextField
              variant="outlined"
              readOnly
              value={fisa.predator}
              label="Predator"
              size="small"
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

          <Box
            sx={{
              width: "55%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <TextField
              variant="outlined"
              readOnly
              value={fisa.fisa}
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
              value={fisa.data}
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
        <hr />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            width="50%"
            marginRight="20px"
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Autocomplete
              options={angajati
                .filter((item) => !item.nume.includes(fisa.predator))
                .map((user) => user.nume)}
              renderInput={(params) => (
                <TextField {...params} label="Primitor" variant="standard" />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setFisa((prev) => {
                    return {
                      ...prev,
                      primitor: newValue,
                    };
                  });
                }
              }}
            />
            <Autocomplete
              options={locatii.map((loc) => loc.proiect)}
              renderInput={(params) => (
                <TextField {...params} label="Locatie" variant="standard" />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setFisa((prev) => {
                    return {
                      ...prev,
                      locatie: newValue,
                    };
                  });
                }
              }}
              value={fisa.locatie}
            />
            <hr />
            <Box>
              <Box>
                <Autocomplete
                  disablePortal
                  sx={{ marginTop: "5px" }}
                  options={workEquipment.map((item) => item.id)}
                  renderInput={(params) => <TextField {...params} label="ID" />}
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
                  label="Marime"
                  sx={{ width: "100%" }}
                  value={selectedCit.marime}
                  disabled
                />
                <TextField
                  variant="standard"
                  label="Cantitate"
                  name="cantitate"
                  sx={{ width: "100%" }}
                  value={selectedCit.cantitate}
                  onChange={handleQuantityChange}
                  required={true}
                  error={!!validationErrors.cantitate}
                  helperText={validationErrors.cantitate}
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
          <HandoverCreateModalTable dialogTableProps={dialogTableProps} />
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
          onClick={() => handleCreateFile()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HandoverCreateModalWEq;
