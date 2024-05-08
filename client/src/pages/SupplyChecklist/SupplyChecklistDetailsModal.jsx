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
import DetailsTable from "../../components/DetailsTable/DetailsTable";
import { SUPPLY_CHECKLIST_DETAILS_MODAL_COLUMNS } from "./Data/supplyChecklistDetailsModalColumns";

const NecesarModalDetalii = ({ open, file, handleClose }) => {
  const [eqList, setEqList] = useState([]);

  useEffect(() => {
    if (file) {
      setEqList(file.echipament);
    } else {
      setEqList([]);
    }
  }, [file]);

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
          <DetailsTable
            data={eqList}
            columns={SUPPLY_CHECKLIST_DETAILS_MODAL_COLUMNS}
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

export default NecesarModalDetalii;
