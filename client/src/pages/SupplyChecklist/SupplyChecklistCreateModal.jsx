import {
  DialogContent,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NecesarDialogTable from "./SupplyChecklistCreateModalTable";
import { createFileNumber } from "../../utils/createFileNumber";
import { renumerotareLista } from "../../utils/renumerotareLista";
import { addFisaNecesar } from "../../redux/slices/necesarSlice";
import { handleFetchFile } from "../../utils/fetchDoecument";
import { formatDate } from "../../utils/formatDate";
import { SUPPLY_CHECKLIST_FILE_INITIAL_STATE } from "./Data/supplyChecklistFileInitialState";
import { SUPPLY_CHECKLIST_EQUIP_INITIAL_STATE } from "./Data/supplyChecklistEquipInitialState";


const NecesarCreateModal = ({ open, dialogProps }) => {
  const { data, handleOpenCreateModal } = dialogProps;

  const user = useSelector((state) => state.users.loggedUser);


  const dispatch = useDispatch();

  const [fisa, setFisa] = useState(SUPPLY_CHECKLIST_FILE_INITIAL_STATE);
  const [echipament, setEchipament] = useState(SUPPLY_CHECKLIST_EQUIP_INITIAL_STATE);

  const dialogTableData = useMemo(() => fisa.echipament, [fisa.echipament]);

  const fileUrl = "http://localhost:3000/coral/it/templates/necesar.docx";

  useEffect(() => {
    setFisa((prev) => {
      return {
        ...prev,
        data: formatDate(new Date()),
        fisa: createFileNumber(data, "N"),
        stare: "In asteptare",
        creat: user.nume,
      };
    });
  }, [data, user.nume]);

  useEffect(() => {
    // set Total general price one item
    setEchipament((prev) => {
      return {
        ...prev,
        total: prev.cantitate * prev.pret,
      };
    });
  }, [echipament.cantitate, echipament.pret]);

  useEffect(() => {
    //set total general
    const total = fisa.echipament.reduce((accumulator, current) => {
      return accumulator + current.total;
    }, 0);

    setFisa((prev) => {
      return {
        ...prev,
        totalFisa: total,
      };
    });
  }, [fisa.echipament]);

  const handleChangeEchip = (e) => {
    const { name, value } = e.target;

    setEchipament((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAdaugaEchipament = () => {
    setFisa((prev) => {
      return {
        ...prev,
        echipament: [
          ...prev.echipament,
          { ...echipament, nrCrt: prev.echipament.length + 1 },
        ],
      };
    });

    setEchipament(SUPPLY_CHECKLIST_EQUIP_INITIAL_STATE);
  };

  const handleRemoveEquipment = (row) => {
    setFisa((prev) => {
      const updatedEchipament = prev.echipament.filter(
        (eq) => eq.echipament !== row
      );

      return {
        ...prev,
        echipament: renumerotareLista(updatedEchipament),
      };
    });
  };

  const handleCreateNecesar = () => {
    if (fisa.echipament.length === 0) return;

    dispatch(addFisaNecesar(fisa));

    handleFetchFile(fileUrl, fisa);

    handleOpenCreateModal();
  };

  const dialogTableProps = {
    data: dialogTableData,
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
              value={fisa.creat}
              label="Creat"
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
        <TextField
          variant="outlined"
          size="small"
          label="Echipament"
          name="echipament"
          onChange={handleChangeEchip}
          value={echipament.echipament}
        />

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            width="20%"
            marginRight="20px"
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              variant="outlined"
              size="small"
              name="pret"
              label="Pret (BUC)"
              onChange={handleChangeEchip}
              value={echipament.pret}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Cantitate"
              name="cantitate"
              onChange={handleChangeEchip}
              value={echipament.cantitate}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Total"
              readOnly
              sx={{
                textAlign: "center",
                "& input": {
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: "aliceblue",
                },
              }}
              value={echipament.total}
            />

            <Button
              style={{ marginTop: "10px" }}
              variant="outlined"
              onClick={handleAdaugaEchipament}
            >
              Adauga
            </Button>
          </Box>
          <NecesarDialogTable dialogTableProps={dialogTableProps} />
        </Box>
        <Box
          width="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Box width={"20%"}>
            <TextField
              variant="outlined"
              size="small"
              label="Total general"
              readOnly
              sx={{
                textAlign: "center",
                "& input": {
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: "aliceblue",
                },
              }}
              value={fisa.totalFisa}
            />
          </Box>
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
          onClick={handleCreateNecesar}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NecesarCreateModal;
