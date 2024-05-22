import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEchipament } from "../../redux/slices/echipSlice";
import DetailsTable from "../../components/DetailsTable/DetailsTable";
import { PREDARE_MODAL_DETALII_COLUMNS } from "./Data/handoverDetailsModalTableColumns";
import { fetchWorkEquipmentList } from "../../redux/slices/workEquipmentSlice";

const HandoverDetailsModal = ({ open, file, handleClose }) => {
  const dispatch = useDispatch();

  const equipment = useSelector((state) => state.echipament);
  const workEquipment = useSelector((state) => state.workEquipmentList);

  const columns = PREDARE_MODAL_DETALII_COLUMNS(file);

  const [eqList, setEqList] = useState([]);

  useEffect(() => {
    dispatch(fetchEchipament());
    dispatch(fetchWorkEquipmentList());
  }, [dispatch]);

  useEffect(() => {
    if (file) {
      const addedEq = [...equipment, ...workEquipment].filter((item) =>
        file.echipament.some((eq) => eq.id === item.id)
      );

      console.log(addedEq);

      setEqList(addedEq);
    } else {
      setEqList([]);
    }
  }, [file, equipment, workEquipment]);

  return (
    <Dialog open={open} maxWidth="lg" fullWidth={true}>
      <DialogContent sx={{ height: "600px" }}>
        <DialogTitle> Informatii fisa </DialogTitle>
        <Box
          className="detalii"
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            justifyContent: "space-around",
          }}
        >
          {Object.entries(file).map(([key, value]) => {
            if (key !== "echipament" && key !== "_id") {
              return (
                <TextField
                  key={key}
                  variant="filled"
                  value={value}
                  label={key.slice(0, 1).toUpperCase() + key.slice(1)}
                />
              );
            } else {
              return null;
            }
          })}
        </Box>
        <hr />
        <DialogTitle> Informatii echipament </DialogTitle>
        <Box className="echipament">
          <DetailsTable data={eqList} columns={columns} />
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

export default HandoverDetailsModal;
