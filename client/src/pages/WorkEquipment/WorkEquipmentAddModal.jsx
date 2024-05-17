import {
  Box,
  Button,
  DialogContent,
  Dialog,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INVOICE_INITIAL_STATE } from "../../data/invoiceInitialState";
import { WORK_EQUIPMENT_INITIAL_STATE } from "./Data/workEquipmentInitialState";
import { WORK_EQUIPMENT_INPUT_LIST } from "./Data/workEquipmentInputList";
import { invoiceValidateInputs } from "../../utils/invoiceValidateInputs";
import WorkEquipmentAddModalTable from "./WorkEquipmentAddModalTable";
import { createNewId } from "./Func/createNewId";
import {
  addWorkEquipment,
  updateWorkEquipment,
} from "../../redux/slices/workEquipmentSlice";
import { workEquipmentValidateInputs } from "./Func/workEquipmentValidateInputs";
import { WORK_EQUIPMENT_TYPES } from "./Data/workEquipmentTypes";

const WorkEquipmentAddModal = ({ open, dialogProps }) => {
  const { handleOpenCreateModal, data } = dialogProps;

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.users.loggedUser);

  const [workEquipmentList, setWorkEquipmentList] = useState([]);

  const [workEquipmentState, setWorkEquipmentState] = useState(
    WORK_EQUIPMENT_INITIAL_STATE
  );

  useEffect(() => {
    console.log(workEquipmentState);
  }, [workEquipmentState]);

  const [tip, setTip] = useState("");

  const [infoInvoiceState, setInfoInvoiceState] = useState(
    INVOICE_INITIAL_STATE
  );
  const [validationErrors, setValidationErrors] = useState({});

  const handleAdaugaEchipament = () => {
    const newValidationErrors = workEquipmentValidateInputs({
      ...workEquipmentState,
      ...infoInvoiceState,
      tip,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    setWorkEquipmentList((prev) => {
      return [
        ...prev,
        {
          ...workEquipmentState,
          ...infoInvoiceState,
          id: createNewId({ ...workEquipmentState, tip: tip }),
          tip: tip,
          stare: "Nou",
          locatie: "Coral Bussiness Center",
          persoana: "Andreea Iorgulescu",
        },
      ];
    });

    resetState();
  };

  const resetState = () => {
    setWorkEquipmentState(WORK_EQUIPMENT_INITIAL_STATE);
    setTip("");
  };

  const handleRemoveItem = (row) => {
    const updatedList = workEquipmentList.filter(
      (item) => item.id !== row.original.id
    );

    setWorkEquipmentList(updatedList);
  };

  const handleChangeWorkEquipment = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setWorkEquipmentState((prev) => ({
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

  const handleAddWorkEquipment = () => {
    const newValidationErrors = invoiceValidateInputs({
      ...infoInvoiceState,
    });
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      console.log("Toate campurile sunt obligatorii");
      return;
    }
    setValidationErrors({});

    workEquipmentList.forEach((equipment) => {
      const matchingData = data.find((item) => item.id === equipment.id);
      if (matchingData) {
        const updatedQuantity =
          parseInt(matchingData.stocNou) + parseInt(equipment.stocNou);
        dispatch(
          updateWorkEquipment({
            ...matchingData,
            stocNou: updatedQuantity,
            intrari: [
              ...matchingData.intrari,
              {
                ...infoInvoiceState,
                receptie: loggedUser.nume,
                cantitate: equipment.stocNou,
                pret: equipment.pret,
              },
            ],
          })
        );
      } else {
        dispatch(
          addWorkEquipment({
            ...infoInvoiceState,
            ...equipment,
            intrari: [infoInvoiceState],
          })
        );
      }
    });

    setInfoInvoiceState(INVOICE_INITIAL_STATE);
    setWorkEquipmentList([]);
    handleOpenCreateModal();
  };

  const dialogTableProps = {
    handleRemoveItem,
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
          {WORK_EQUIPMENT_INPUT_LIST.slice(4).map((name) => (
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
          {WORK_EQUIPMENT_INPUT_LIST.slice(0, 1).map((name) => (
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
              {WORK_EQUIPMENT_TYPES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ))}
          {WORK_EQUIPMENT_INPUT_LIST.slice(1, 4).map((name) => (
            <TextField
              key={name}
              name={name === "cantitate" ? "stocNou" : name}
              variant="standard"
              label={name.slice(0, 1).toUpperCase() + name.slice(1)}
              onChange={handleChangeWorkEquipment}
              value={
                name === "cantitate"
                  ? workEquipmentState["stocNou"]
                  : workEquipmentState[name]
              }
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

          <Button
            variant="outlined"
            sx={{ marginTop: "10px" }}
            onClick={() => handleAdaugaEchipament()}
          >
            Adauga
          </Button>
        </Box>
        <WorkEquipmentAddModalTable
          data={workEquipmentList}
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
          onClick={() => handleAddWorkEquipment(workEquipmentList)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkEquipmentAddModal;
