import {
  Autocomplete,
  Box,
  Button,
  DialogContent,
  TextField,
  Dialog,
  DialogActions,
} from "@mui/material";
import PredareDialogTable from "./HandoverCreateModalTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createFileNumber } from "../../utils/createFileNumber";
import {
  fetchEchipament,
  updateEchipament,
} from "../../redux/slices/echipSlice";
import {
  fetchLocations,
  updateLocation,
} from "../../redux/slices/locationsSlice";
import { handleFetchFile } from "../../utils/fetchDoecument";
import { addFisaPredare } from "../../redux/slices/predareSlice";
import { formatDate } from "../../utils/formatDate";
import { fetchAllUsers, updateUser } from "../../redux/slices/usersSlice";
import { IT_EQUIPMENT_INITIAL_STATE } from "../ItEquipment/Data/itEquipmentInitialState";
import { HANDOVER_FILE_INITIAL_STATE } from "./Data/handoverFileInitialState";
import {
  addMobilePhone,
  fetchMobilePhones,
  updateMobilePhones,
} from "../../redux/slices/mobilePhonesSlice";

const HandoverCreateModal = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;

  const dispatch = useDispatch();

  const mobilePhones = useSelector((state) => state.telefoane);
  const echipament = useSelector((state) => state.echipament);
  const angajati = useSelector((state) => state.users.allUsers);
  const locatii = useSelector((state) => state.locatii);

  const user = useSelector((state) => state.users.loggedUser);

  const [fisa, setFisa] = useState(HANDOVER_FILE_INITIAL_STATE);
  const [selectedCit, setSelectedCit] = useState(IT_EQUIPMENT_INITIAL_STATE);

  const [addedEquipment, setAddedEquipment] = useState([]);

  const fileUrl = "http://localhost:3000/coral/it/templates/predare.docx";

  useEffect(() => {
    dispatch(fetchEchipament());
    dispatch(fetchLocations());
    dispatch(fetchAllUsers());
    dispatch(fetchMobilePhones());
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
      const combinedList = [...echipament, ...mobilePhones];

      const updatedList = combinedList.filter((eq) => {
        return fisa.echipament.some((cit) => cit === eq.cit);
      });
      return [...updatedList];
    });
  }, [fisa.echipament, echipament, mobilePhones]);

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

    let response = await dispatch(
      addFisaPredare({
        ...fisa,
        primitor: fisa.primitor === "" ? fisa.locatie : fisa.primitor,
      })
    );

    if (response.meta.requestStatus === "fulfilled") {
      fisa.echipament.forEach((cit) => {
        const combinedEquipment = [...echipament, ...mobilePhones];

        const filteredEquipments = combinedEquipment.filter(
          (item) => item.cit === cit
        );

        filteredEquipments.forEach((eq) => {
          const eqUpdate = {
            ...eq,
            persoana: fisa.primitor === "" ? fisa.locatie : fisa.primitor,
            locatie: fisa.locatie,
            pv: [...eq.pv, fisa.fisa],
          };

          if (eq.tip === "Telefon") {
            dispatch(updateMobilePhones(eqUpdate));
          } else {
            dispatch(updateEchipament(eqUpdate));
          }
        });
      });

      const primitor = angajati.find(
        (angajat) => angajat.nume === fisa.primitor
      );

      if (primitor) {
        dispatch(
          updateUser({
            ...primitor,
            echipamente: [...primitor.echipamente, ...fisa.echipament],
          })
        );
      } else {
        const locatie = locatii.find(
          (locatie) => locatie.proiect === fisa.locatie
        );
        dispatch(
          updateLocation({
            ...locatie,
            echipamente: [...locatie.echipamente, ...fisa.echipament],
          })
        );
      }

      handleFetchFile(fileUrl, { ...fisa, echipament: [...addedEquipment] });
    } else {
      throw new Error("Adaugarea fisei nu a avut succes");
    }

    setFisa(HANDOVER_FILE_INITIAL_STATE);
    handleOpenCreateModal();
  };

  const handleSelectionChange = (event, newValue) => {
    if (newValue === null) return;
    setSelectedCit(
      [...echipament, ...mobilePhones].find((item) => item.cit === newValue)
    );
  };

  const handleAdaugaEchipament = () => {
    setFisa((prev) => {
      const findItem = prev.echipament.find((cit) => cit === selectedCit.cit);
      if (findItem) return prev;

      return { ...prev, echipament: [...prev.echipament, selectedCit.cit] };
    });
  };

  const handleRemoveEquipment = (itemID) => {
    setFisa((prev) => {
      return {
        ...prev,
        echipament: prev.echipament.filter((item) => item.cit !== itemID),
      };
    });
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
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box width={"20%"}>
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
              width: "40%",
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
            width="25%"
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
                  options={[...echipament, ...mobilePhones].map((eq) => eq.cit)}
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
          <PredareDialogTable dialogTableProps={dialogTableProps} />
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

export default HandoverCreateModal;
