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
import { MOBILE_PHONES_DETAILS_MODAL_PV_COLUMNS } from "./Data/mobilePhonesDetailsModalPvColumns";
import { INV_TABLE_COLUMNS } from "../ItInventory/inventarDatas";
import Notice from "../../components/Notice/Noice";

const MobilePhonesDetailsModal = ({ open, file, handleClose }) => {
  const dispatch = useDispatch();

  const handover = useSelector((state) => state.predare);
  const retur = useSelector((state) => state.retur);

  const [pv, setPv] = useState([]);

  useEffect(() => {
    dispatch(fetchFisePredare());
    dispatch(fetchFiseRetur());
  }, [dispatch]);

  useEffect(() => {
    setPv(() => {
      const combinedPV = [...handover, ...retur];

      const updatedList = combinedPV.filter((p) => {
        return file.pv.some((cit) => cit === p.fisa);
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
                    value={key !== "pv" ? value : value.length.toString()}
                    label={
                      key === "pv"
                        ? "Procese Verbale"
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
          <DialogTitle> Informatii procese verbale </DialogTitle>
          <DetailsTable
            data={pv}
            columns={MOBILE_PHONES_DETAILS_MODAL_PV_COLUMNS}
          />
        </Box>
        <hr />
        <Box className="mp-inventory">
          <DialogTitle> Lista inventare </DialogTitle>
          <DetailsTable data={[]} columns={INV_TABLE_COLUMNS} />
        </Box>
        <hr />
        <Box className="mp-notice">
          <DialogTitle> Observatii </DialogTitle>
          <Notice file={file} />
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

export default MobilePhonesDetailsModal;
