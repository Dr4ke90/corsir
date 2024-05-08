import {
  Box,
  Button,
  DialogContent,
  Dialog,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import EqDialogTable from "./ItEquipmentCreateModalTable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adaugaEchipament } from "../../redux/slices/echipSlice";
import { IT_EQUIPMENT_INPUT_LIST } from "./Data/itEquipmentInputList";
import { IT_EQUIPMENT_TYPES } from "./Data/ItEquipmentTypes";
import { IT_EQUIPMENT_INITIAL_STATE } from "./Data/itEquipmentInitialState";
import { INVOICE_INITIAL_STATE } from "../../data/invoiceInitialState";
import { createNewCit } from "./Func/createNewCit";
import { equipmentListRenumbering } from "./Func/itEquipmentRenumbering";
import { itEquipmentValidateInputs } from "./Func/itEquipmentValidateInputs";
import { invoiceValidateInputs } from "../../utils/invoiceValidateInputs";

const ModalEquipment = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;

  const [newEquipmentList, setNewEquipmentList] = useState([]);

  const [equipState, setEquipState] = useState(IT_EQUIPMENT_INITIAL_STATE);

  const [infoInvoiceState, setInfoInvoiceState] = useState(
    INVOICE_INITIAL_STATE
  );
  const [tip, setTip] = useState("");
  const [cantitate, setCantitate] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const [renumberingStartNr, setRenumberingStartNr] = useState(0);

  useEffect(() => {
    if (newEquipmentList.length > 0) {
      const initialStartNr = parseInt(newEquipmentList[0].cit.substring(3));
      setRenumberingStartNr(initialStartNr);
    }
  }, [newEquipmentList]);

  const handleAdaugaEchipament = () => {
    const newValidationErrors = itEquipmentValidateInputs({
      ...equipState,
      tip,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    const newItems = [];
    let newCit;
    let newEquipment;
    if (cantitate !== "") {
      for (let i = 0; i < cantitate; i++) {
        newCit = createNewCit(data, [...newEquipmentList, ...newItems]);

        newEquipment = createEchipament(newCit);
        newItems.push(newEquipment);
      }
    } else {
      newCit = createNewCit(data, [...newEquipmentList, ...newItems]);

      newEquipment = createEchipament(newCit);
      newItems.push(newEquipment);
    }

    setNewEquipmentList([...newEquipmentList, ...newItems]);
    resetEchipament();
  };

  const createEchipament = (cit) => {
    return {
      ...equipState,
      ...infoInvoiceState,
      cit: cit,
      tip: tip,
      stare: "Nou",
      locatie: "Coral Bussiness Center",
      persoana: "IT",
      inventar: infoInvoiceState.achizitie,
      pret: parseFloat(equipState.pret),
    };
  };

  const resetEchipament = () => {
    setEquipState(IT_EQUIPMENT_INITIAL_STATE);
    setCantitate("");
    setTip("");
  };

  const handleRemoveItem = (row) => {
    const updatedList = newEquipmentList.filter(
      (item) => item.cit !== row.original.cit
    );
    const renumberedList = equipmentListRenumbering(
      updatedList,
      renumberingStartNr
    );
    setNewEquipmentList(renumberedList);
  };

  const handleEditEquipment = (editedItem) => {
    setNewEquipmentList((prevEquipmentList) => {
      const updatedList = prevEquipmentList.map((item) => {
        if (item.cit === editedItem.cit) {
          return { ...item, ...editedItem };
        }
        return item;
      });
      return updatedList;
    });
  };

  const handleChangeEquipment = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEquipState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeInvoice = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfoInvoiceState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTip = (e) => {
    e.preventDefault();
    setTip(e.target.value);
  };

  const handleCreateEquipment = () => {
    const newValidationErrors = invoiceValidateInputs({
      ...infoInvoiceState,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    newEquipmentList.forEach((eq) => dispatch(adaugaEchipament(eq)));

    setInfoInvoiceState(INVOICE_INITIAL_STATE);
    setNewEquipmentList([]);
    handleOpenCreateModal();
  };

  const handleChangeCantitate = (e) => {
    setCantitate(e.target.value);
  };

  const dialogTableProps = {
    handleRemoveItem,
    handleEditEquipment,
  };

  return (
    <Dialog open={open} maxWidth="lg" fullWidth={true}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          position: "relative",
        }}
      >
        <Box
          width="400px"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {IT_EQUIPMENT_INPUT_LIST.slice(5).map((name) => (
            <TextField
              key={name}
              name={name}
              variant="standard"
              label={
                name !== "achizitie"
                  ? name.slice(0, 1).toUpperCase() + name.slice(1)
                  : ""
              }
              sx={{
                marginTop: name === "achizitie" ? "13px" : undefined,
              }}
              onChange={handleChangeInvoice}
              value={infoInvoiceState[name]}
              type={name === "achizitie" ? "date" : "text"}
              size="small"
              required={true}
              error={!!validationErrors[name]}
              helperText={validationErrors[name]}
              onFocus={() =>
                setValidationErrors({
                  ...validationErrors,
                  [name]: undefined,
                })
              }
            />
          ))}
          <hr />
          {IT_EQUIPMENT_INPUT_LIST.slice(0, 1).map((name) => (
            <TextField
              key={name}
              name={name}
              variant="standard"
              label={name.slice(0, 1).toUpperCase() + name.slice(1)}
              onChange={handleChangeTip}
              value={tip}
              size="small"
              select
              required={true}
              error={!!validationErrors?.tip}
              helperText={validationErrors?.tip}
              onFocus={() =>
                setValidationErrors({
                  ...validationErrors,
                  tip: undefined,
                })
              }
            >
              {IT_EQUIPMENT_TYPES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ))}
          {IT_EQUIPMENT_INPUT_LIST.slice(1, 5).map((name) => (
            <TextField
              key={name}
              name={name}
              variant="standard"
              label={name.slice(0, 1).toUpperCase() + name.slice(1)}
              onChange={
                name !== "cantitate"
                  ? handleChangeEquipment
                  : handleChangeCantitate
              }
              value={name !== "cantitate" ? equipState[name] : cantitate}
              size="small"
              required={name === "serie" || name === "cantitate" ? false : true}
              error={!!validationErrors[name]}
              helperText={validationErrors[name]}
              onFocus={() =>
                setValidationErrors({
                  ...validationErrors,
                  [name]: undefined,
                })
              }
            />
          ))}

          <Button
            variant="outlined"
            sx={{ marginTop: "10px" }}
            onClick={() => handleAdaugaEchipament()}
          >
            Adauga
          </Button>
        </Box>
        <EqDialogTable
          data={newEquipmentList}
          dialogTableProps={dialogTableProps}
        />
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
          onClick={() => handleCreateEquipment(newEquipmentList)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEquipment;
