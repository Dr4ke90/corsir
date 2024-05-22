import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsTable from "../../components/DetailsTable/DetailsTable";
import { fetchFisePredare } from "../../redux/slices/predareSlice";
import { fetchFiseRetur } from "../../redux/slices/returSlice";
import { INV_TABLE_COLUMNS } from "../ItInventory/inventarDatas";
import Notice from "../../components/Notice/Noice";
import { WORK_EQUIPMENT_DETAILS_MODAL_PV_COLUMNS } from "./Data/workEquipmentDetailsModalPvColumns";
import { WORK_EQUIPMENT_DETAILS_MODAL_INPUTS_COLUMNS } from "./Data/workEquipmentDetailsModalInputsColumns";

const WorkEquipmentDetailsModal = ({ open, file, handleClose }) => {
  const dispatch = useDispatch();

  const handover = useSelector((state) => state.predare);
  const retur = useSelector((state) => state.retur);

  const inputsColumns = WORK_EQUIPMENT_DETAILS_MODAL_INPUTS_COLUMNS();
  const exitsColumns = WORK_EQUIPMENT_DETAILS_MODAL_PV_COLUMNS(file);
  const inventoryColumns = INV_TABLE_COLUMNS();

  const [pv, setPv] = useState([]);

  useEffect(() => {
    dispatch(fetchFisePredare());
    dispatch(fetchFiseRetur());
  }, [dispatch]);

  useEffect(() => {
    setPv(() => {
      const combinedPV = [...handover, ...retur];

      const updatedList = combinedPV.filter((p) => {
        return file.pv.some((id) => id === p.fisa);
      });
      return [...updatedList];
    });
  }, [handover, retur, file.pv]);

  return (
    <Dialog open={open} maxWidth="lg" fullWidth={true}>
      <DialogContent sx={{ height: "600px" }}>
        <DialogTitle> Informatii fisa </DialogTitle>
        <Box
          className="detalii"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            marginBottom: "10px",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "3px",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Object.entries(file).map(([key, value]) => {
              if (key !== "_id" && key !== "observatii") {
                return (
                  <TextField
                    key={key}
                    variant="filled"
                    value={
                      key !== "pv" && key !== "intrari" && key !== "inventar"
                        ? value
                        : value.length.toString()
                    }
                    label={
                      key === "pv"
                        ? "Iesiri"
                        : key.slice(0, 1).toUpperCase() + key.slice(1) &&
                          key === "stocNou"
                        ? "Stoc (NOU)"
                        : key.slice(0, 1).toUpperCase() + key.slice(1) &&
                          key === "stocUzat"
                        ? "Stoc (UZAT)"
                        : key.slice(0, 1).toUpperCase() + key.slice(1)
                    }
                    size="small"
                    InputLabelProps={{
                      style: { color: "blueviolet" },
                    }}
                  />
                );
              } else {
                return null;
              }
            })}
          </Box>
        </Box>
        <hr />
        <Box className="mp-pvInfo">
          <DialogTitle> Intrari </DialogTitle>
          <DetailsTable data={file.intrari} columns={inputsColumns} />
        </Box>
        <hr />
        <Box className="mp-pvInfo">
          <DialogTitle> Iesiri </DialogTitle>
          <DetailsTable data={pv} columns={exitsColumns} />
        </Box>
        <hr />
        <Box className="mp-inventory">
          <DialogTitle> Inventare </DialogTitle>
          <DetailsTable data={file.inventar} columns={inventoryColumns} />
        </Box>
        <hr />
        <Box className="mp-notice">
          <DialogTitle> Observatii </DialogTitle>
          <Notice equipment={file} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: "50px" }}
          onClick={() => handleClose()}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkEquipmentDetailsModal;
