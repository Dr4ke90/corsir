import {
  Autocomplete,
  Box,
  Button,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
} from "@mui/material";
import ReturDialogTable from "./ReturnCreateModalTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createFileNumber } from "../../utils/createFileNumber";
import { fetchFisePredare } from "../../redux/slices/predareSlice";

import { handleFetchFile } from "../../utils/fetchDoecument";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { addFisaRetur } from "../../redux/slices/returSlice";
import { formatDate } from "../../utils/formatDate";
import { RETURN_FILE_INITIAL_STATE } from "./Data/returnFileInitialState";
import { fetchAllUsers } from "../../redux/slices/usersSlice";

import { WORK_EQUIPMENT_INITIAL_STATE } from "../WorkEquipment/Data/workEquipmentInitialState";
import {
  fetchWorkEquipmentList,
  updateWorkEquipment,
} from "../../redux/slices/workEquipmentSlice";
import { useReturnUpdateEmployee } from "./Func/useReturnUpdateEmployee";
import { returnValidateFileData } from "./Func/returnValidateFileData";
import { returnValidateInputs } from "./Func/returnValidateInputs";

const ReturnCreateModalWEq = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;
  const dispatch = useDispatch();
  const returnUpdateEmployee = useReturnUpdateEmployee();

  const predare = useSelector((state) => state.predare).filter(
    (item) => item.dep === "tehnic"
  );
  const locations = useSelector((state) => state.locatii);
  const employees = useSelector((state) => state.users.allUsers);
  const workEquipment = useSelector((state) => state.workEquipmentList);

  const [fisa, setFisa] = useState(RETURN_FILE_INITIAL_STATE);
  const [selectedEquipment, setSelectedEquipment] = useState(
    WORK_EQUIPMENT_INITIAL_STATE
  );

  const [addedEquipment, setAddedEquipment] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const fileUrl =
    "http://localhost:3000/coral/it/templates/retur-echip-lucru.docx";

  const [selectedPv, setSelectedPv] = useState("");

  useEffect(() => {
    dispatch(fetchFisePredare());
    dispatch(fetchLocations());
    dispatch(fetchAllUsers());
    dispatch(fetchWorkEquipmentList());
  }, [dispatch]);

  useEffect(() => {
    setFisa((prevFisa) => ({
      ...prevFisa,
      fisa: createFileNumber(data, "R"),
      data: formatDate(new Date()),
    }));
  }, [data]);

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
              stare: matchingItem.stare,
            };
          }
          return eq;
        })
        .filter((eq) => fisa.echipament.some((item) => item.id === eq.id));
      return updatedList;
    });
  }, [fisa.echipament, workEquipment]);

  useEffect(() => {
    if (selectedPv === null) return;

    const [pv] = selectedPv.split(" ");

    const selectedFile = predare.find((fisa) => fisa.fisa === pv);
    if (!selectedFile) return;

    const updatedFile = { ...selectedFile };
    delete updatedFile.fisa;
    delete updatedFile.data;
    delete updatedFile._id;
    setFisa((prev) => {
      const updates = selectedFile.echipament.map((item) => {
        return {
          ...item,
          stare: "Uzat",
        };
      });

      return {
        ...prev,
        ...updatedFile,
        predator: selectedFile.primitor,
        primitor: updatedFile.predator,
        echipament: updates,
        ...(selectedPv ? { pvPredare: selectedFile.fisa } : null),
      };
    });
  }, [selectedPv, predare]);

  const handleChangePvPredare = (event, newValue) => {
    setSelectedPv(newValue);
  };

  const handleIdChange = (event, newValue) => {
    if (newValue === null) return;
    setSelectedEquipment(workEquipment.find((item) => item.id === newValue));
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdaugaEchipament = () => {
    const newValidationErrors = returnValidateInputs({
      ...selectedEquipment,
      cantitate: quantity,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    setFisa((prev) => {
      const findItem = prev.echipament.find(
        (item) => item.id === selectedEquipment.id
      );
      if (findItem) return prev;

      return {
        ...prev,
        echipament: [
          ...prev.echipament,
          { id: selectedEquipment.id, cantitate: quantity, stare: "Uzat" },
        ],
      };
    });

    setSelectedEquipment(WORK_EQUIPMENT_INITIAL_STATE);
    setQuantity("");
  };

  const handleRemoveEquipment = (itemID) => {
    setFisa((prev) => {
      return {
        ...prev,
        echipament: prev.echipament.filter((item) => item.id !== itemID),
      };
    });
  };

  const handleCreateFile = async () => {
    const newValidationErrors = returnValidateFileData(fisa);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    if (fisa.echipament.length === 0) return;

    const response = await dispatch(addFisaRetur(fisa));

    if (response.meta.requestStatus === "fulfilled") {
      fisa.echipament.forEach((addedEq) => {
        const filteredEquipments = workEquipment.filter(
          (item) => item.id === addedEq.id
        );

        filteredEquipments.forEach((item) => {
          const eqUpdate = {
            ...item,
            pv: [...item.pv, fisa.fisa],
            stocUzat: parseInt(item.stocUzat) + parseInt(addedEq.cantitate),
            predat: item.predat
              ? parseInt(item.predat) - parseInt(addedEq.cantitate)
              : parseInt(addedEq.cantitate),
          };

          dispatch(updateWorkEquipment(eqUpdate));
        });
      });

      returnUpdateEmployee(employees, fisa);

      handleFetchFile(fileUrl, { ...fisa, echipament: [...fisa.echipament] });
    } else {
      throw new Error("Adaugarea fisei nu a avut succes");
    }

    handleOpenCreateModal();
  };

  const dialogTableProps = {
    addedEquipment,
    handleRemoveEquipment,
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
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ marginTop: "5px", width: "300px" }}
            options={predare.map((file) => `${file.fisa} - ${file.primitor}`)}
            renderInput={(params) => (
              <TextField {...params} label="PV Predare" />
            )}
            onChange={handleChangePvPredare}
            size="small"
            value={selectedPv}
          />
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "row",
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
            width="25%"
            marginRight="20px"
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Autocomplete
              options={employees.map((employee) => employee.nume)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Predator"
                  variant="standard"
                  required={true}
                  error={!!validationErrors.predator}
                  helperText={validationErrors.predator}
                  onFocus={() =>
                    setValidationErrors({
                      ...validationErrors,
                      predator: undefined,
                    })
                  }
                />
              )}
              value={fisa.predator}
              onChange={(event, newValue) => {
                if (newValue) {
                  setFisa((prev) => {
                    return {
                      ...prev,
                      predator: newValue,
                    };
                  });
                }
              }}
            />
            <Autocomplete
              options={employees.map((employee) => employee.nume)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Primitor"
                  variant="standard"
                  required={true}
                  error={!!validationErrors.primitor}
                  helperText={validationErrors.primitor}
                  onFocus={() =>
                    setValidationErrors({
                      ...validationErrors,
                      primitor: undefined,
                    })
                  }
                />
              )}
              value={fisa.primitor}
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
              options={locations.map((loc) => loc.proiect)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Locatie"
                  variant="standard"
                  required={true}
                  error={!!validationErrors.locatie}
                  helperText={validationErrors.locatie}
                  onFocus={() =>
                    setValidationErrors({
                      ...validationErrors,
                      locatie: undefined,
                    })
                  }
                />
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
                  id="combo-box-demo"
                  sx={{ marginTop: "5px" }}
                  options={workEquipment.map((item) => item.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="ID"
                      required={true}
                      error={!!validationErrors.id}
                      helperText={validationErrors.id}
                      onFocus={() =>
                        setValidationErrors({
                          ...validationErrors,
                          id: undefined,
                        })
                      }
                    />
                  )}
                  onChange={handleIdChange}
                  size="small"
                />
                <TextField
                  variant="standard"
                  label="Tip"
                  sx={{ marginTop: "15px", width: "100%" }}
                  value={selectedEquipment.tip}
                  disabled
                />
                <TextField
                  variant="standard"
                  label="Marime"
                  sx={{ width: "100%" }}
                  value={selectedEquipment.marime}
                  disabled
                />
                <TextField
                  variant="standard"
                  label="Cantitate"
                  sx={{ width: "100%" }}
                  value={quantity}
                  onChange={handleChangeQuantity}
                  required={true}
                  error={!!validationErrors.cantitate}
                  helperText={validationErrors.cantitate}
                  onFocus={() =>
                    setValidationErrors({
                      ...validationErrors,
                      cantitate: undefined,
                    })
                  }
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
          <ReturDialogTable data={dialogTableProps} />
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

export default ReturnCreateModalWEq;
