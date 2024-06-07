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
import {
  fetchEchipament,
  updateEchipament,
} from "../../redux/slices/echipSlice";
import { handleFetchFile } from "../../utils/fetchDoecument";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { addFisaRetur } from "../../redux/slices/returSlice";
import { formatDate } from "../../utils/formatDate";
import { IT_EQUIPMENT_INITIAL_STATE } from "../ItEquipment/Data/itEquipmentInitialState";
import { RETURN_FILE_INITIAL_STATE } from "./Data/returnFileInitialState";
import { fetchAllUsers, updateUser } from "../../redux/slices/usersSlice";
import {
  fetchMobilePhones,
  updateMobilePhones,
} from "../../redux/slices/mobilePhonesSlice";
import { returnValidateInputs } from "./Func/returnValidateInputs";
import { returnValidateFileData } from "./Func/returnValidateFileData";
import { useReturnUpdateEmployee } from "./Func/useReturnUpdateEmployee";

const ReturnCreateModal = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;
  const dispatch = useDispatch();

  const predare = useSelector((state) => state.predare).filter(
    (item) => item.dep === "it"
  );
  const echipament = useSelector((state) => state.echipament);
  const locations = useSelector((state) => state.locatii);
  const employees = useSelector((state) => state.users.allUsers);
  const mobilePhones = useSelector((state) => state.telefoane);

  const [fisa, setFisa] = useState(RETURN_FILE_INITIAL_STATE);
  const [selectedCit, setSelectedCit] = useState(IT_EQUIPMENT_INITIAL_STATE);

  const returnUpdateEmployee = useReturnUpdateEmployee();

  const [addedEquipment, setAddedEquipment] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  const fileUrl = "http://localhost:3000/coral/it/templates/retur.docx";

  const [selectedPv, setSelectedPv] = useState("");

  useEffect(() => {
    dispatch(fetchFisePredare());
    dispatch(fetchEchipament());
    dispatch(fetchLocations());
    dispatch(fetchAllUsers());
    dispatch(fetchMobilePhones());
  }, [dispatch]);

  useEffect(() => {
    setFisa((prevFisa) => ({
      ...prevFisa,
      fisa: createFileNumber(data, "R"),
      data: formatDate(new Date()),
    }));
  }, [data]);

  useEffect(() => {
    console.log(fisa);
  }, [fisa]);

  useEffect(() => {
    setAddedEquipment(() => {
      const updatedList = echipament.filter((eq) => {
        return fisa.echipament.some((item) => item.id === eq.id);
      });
      return [...updatedList];
    });
  }, [fisa.echipament]);

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
      if (
        prev.fisa === selectedFile.fisa &&
        prev.primitor === updatedFile.predator &&
        prev.predator === selectedFile.primitor
      ) {
        return prev;
      }
      return {
        ...prev,
        ...updatedFile,
        predator: selectedFile.primitor,
        primitor: updatedFile.predator,
        pvPredare: selectedFile.fisa,
      };
    });
  }, [selectedPv]);

  const handleChangePvPredare = (event, newValue) => {
    setSelectedPv(newValue);
  };

  const handleCitChange = (event, newValue) => {
    if (newValue === null) return;
    setSelectedCit(echipament.find((item) => item.id === newValue));
  };

  const handleAdaugaEchipament = () => {
    const newValidationErrors = returnValidateInputs(selectedCit);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    setFisa((prev) => {
      const findItem = prev.echipament.find((eq) => eq.id === selectedCit.id);
      if (findItem) return prev;

      return {
        ...prev,
        echipament: [
          ...prev.echipament,
          { id: selectedCit.id, stare: selectedCit.stare },
        ],
      };
    });
  };

  const handleRemoveEquipment = (itemID) => {
    setFisa((prev) => {
      return {
        ...prev,
        echipament: prev.echipament.filter((item) => item !== itemID),
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
      const combineEquipment = [...echipament, ...mobilePhones];

      fisa.echipament.forEach((eq) => {
        const filteredEquipments = combineEquipment.filter(
          (item) => item.id === eq.id
        );

        filteredEquipments.forEach((item) => {
          const eqUpdate = {
            ...item,
            persoana: fisa.primitor,
            locatie: fisa.locatie,
            pv: [...item.pv, fisa.fisa],
          };

          if (item.tip === "Telefon") {
            dispatch(updateMobilePhones(eqUpdate));
          } else {
            dispatch(updateEchipament(eqUpdate));
          }
        });
      });

      returnUpdateEmployee(employees, fisa);

      handleFetchFile(fileUrl, { ...fisa, echipament: [...addedEquipment] });
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
                  sx={{ marginTop: "5px" }}
                  options={echipament.map((item) => item.id)}
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
                  onChange={handleCitChange}
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

export default ReturnCreateModal;
