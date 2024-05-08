import {
  Box,
  Button,
  DialogContent,
  Dialog,
  DialogActions,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { INVOICE_INITIAL_STATE } from "../../data/invoiceInitialState";
import { MOBILE_PHONE_INITIAL_STATE } from "./Data/mobilePhoneInitialState";
import { MOBILE_PHONE_INPUT_LIST } from "./Data/mobilePhonesInputList";
import { createNewCtmNumber } from "./Func/createNewCtm";
import MobilePhonesAddModalTable from "./MobilePhonesAddModalTable";
import { addMobilePhone } from "../../redux/slices/mobilePhonesSlice";
import { mobilePhonesValidateInputs } from "./Func/mobilePhonesValidateInputs";
import { phoneListRenumbering } from "./Func/phoneListRenumbering";
import { invoiceValidateInputs } from "../../utils/invoiceValidateInputs";


const AddMobilePhonesModall = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;

  const dispatch = useDispatch();

  const [newPhoneList, setNewPhoneList] = useState([]);

  const [mobilePhoneState, setMobilePhoneState] = useState(
    MOBILE_PHONE_INITIAL_STATE
  );

  const [infoInvoiceState, setInfoInvoiceState] = useState(
    INVOICE_INITIAL_STATE
  );
  const [cantitate, setCantitate] = useState("");
  const [renumberingStartNr, setRenumberingStartNr] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (newPhoneList.length > 0) {
      const initialStartNr = parseInt(newPhoneList[0].cit.substring(3));
      setRenumberingStartNr(initialStartNr);
    }
  }, [newPhoneList]);

  const handleAdaugaEchipament = () => {
    const newValidationErrors = mobilePhonesValidateInputs({
      ...mobilePhoneState,
      ...infoInvoiceState,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    const newItems = [];
    let newCit;
    let newMobilePhone;
    if (cantitate !== "") {
      for (let i = 0; i < cantitate; i++) {
        newCit = createNewCtmNumber(data, [...newPhoneList, ...newItems]);

        newMobilePhone = createEchipament(newCit);
        newItems.push(newMobilePhone);
      }
    } else {
      newCit = createNewCtmNumber(data, [...newPhoneList, ...newItems]);

      newMobilePhone = createEchipament(newCit);
      newItems.push(newMobilePhone);
    }

    setNewPhoneList([...newPhoneList, ...newItems]);
    resetEchipament();
  };

  const createEchipament = (cit) => {
    return {
      ...mobilePhoneState,
      ...infoInvoiceState,
      cit: cit,
      tip: "Telefon",
      stare: "Nou",
      locatie: "Coral Bussiness Center",
      persoana: "Ana Maria Szabo",
    };
  };

  const resetEchipament = () => {
    setMobilePhoneState(MOBILE_PHONE_INITIAL_STATE);
    setCantitate("");
  };

  const handleRemoveItem = (row) => {
    const updatedList = newPhoneList.filter(
      (item) => item.cit !== row.original.cit
    );

    const renumberedList = phoneListRenumbering(
      updatedList,
      renumberingStartNr
    );

    setNewPhoneList(renumberedList);
  };

  const handleEditEquipment = (editedItem) => {
    setNewPhoneList((prevEquipmentList) => {
      const updatedList = prevEquipmentList.map((item) => {
        if (item.cit === editedItem.cit) {
          return { ...item, ...editedItem };
        }
        return item;
      });
      return updatedList;
    });
  };

  const handleChangeMobilePhone = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMobilePhoneState((prev) => ({
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

  const handleAddMobilePhone = () => {
    const newValidationErrors = invoiceValidateInputs({
      ...infoInvoiceState,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    newPhoneList.forEach((phone) => dispatch(addMobilePhone(phone)));

    setInfoInvoiceState(INVOICE_INITIAL_STATE);
    setNewPhoneList([]);
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
          maxHeight: "80vh",
          overflowY: "auto",
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
          {MOBILE_PHONE_INPUT_LIST.slice(3).map((name) => (
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

          {MOBILE_PHONE_INPUT_LIST.slice(0, 3).map((name) => (
            <TextField
              key={name}
              name={name}
              variant="standard"
              label={name.slice(0, 1).toUpperCase() + name.slice(1)}
              onChange={
                name !== "cantitate"
                  ? handleChangeMobilePhone
                  : handleChangeCantitate
              }
              value={name !== "cantitate" ? mobilePhoneState[name] : cantitate}
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
        <MobilePhonesAddModalTable
          data={newPhoneList}
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
          onClick={() => handleAddMobilePhone(newPhoneList)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMobilePhonesModall;
