import {
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import DetailsTable from "../../components/DetailsTable/DetailsTable";
import { DIALOG_TABLE_COLUMNS } from "./inventarDatas";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEchipament,
  updateEchipament,
} from "../../redux/slices/echipSlice";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { formatDate } from "../../utils/formatDate";
import { updateInventoryFile } from "../../redux/slices/inventarSlice";

const ModalDetaliiInventar = ({ open, file, handleClose }) => {
  const [eqList, setEqList] = useState([]);

  const dispatch = useDispatch();

  const dbEquipmentList = useSelector((state) => state.echipament);
  const locatii = useSelector((state) => state.locatii);

  const handleUpdateEquipment = ({ values, table }) => {
    dispatch(updateEchipament({ ...values, inventar: formatDate(new Date()) }));

    setEqList((prev) => prev.filter((item) => item.cit !== values.cit));

    table.setEditingRow(null);
  };

  const handleCloseInventory = () => {
    dispatch(updateInventoryFile({ ...file, stare: "Inchis" }));

    handleClose();
  };

  useEffect(() => {
    dispatch(fetchEchipament());
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    const updatedList = dbEquipmentList.filter((item) => {
      return file.echipament.some((cit) => cit === item.cit);
    });
    if (file.echipament.length !== 0) {
      setEqList(updatedList);
    } else {
      setEqList([]);
    }
  }, [file]);

  return (
    <Dialog open={open} maxWidth="xl" fullWidth={true}>
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
            if (key !== "_id") {
              return (
                <TextField
                  key={key}
                  variant="filled"
                  value={key === "echipament" ? value.length : value}
                  label={key.slice(0, 1).toUpperCase() + key.slice(1)}
                />
              );
            }
          })}
        </Box>
        <hr />
        <DialogTitle> Informatii echipament </DialogTitle>
        <Box className="echipament">
          <DetailsTable
            data={eqList}
            columns={DIALOG_TABLE_COLUMNS}
            locatii={locatii.map((item) => item.proiect)}
            handleUpdateEquipment={handleUpdateEquipment}
            handleCloseInventory={handleCloseInventory}
            file={file}
            dbEquipmentList={dbEquipmentList}
          />
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

export default ModalDetaliiInventar;
