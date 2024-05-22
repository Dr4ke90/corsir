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
import { IT_EQUIP_DETAILS_MODAL_SERVICE_COLUMNS } from "./Data/itEquipDetailsModalServiceColumns";
import { IT_EQUIP_DETAILS_MODAL_PV_COLUMNS } from "./Data/itEquipDetailsModalPvColumns";
import { INV_TABLE_COLUMNS } from "../ItInventory/inventarDatas";
import Notice from "../../components/Notice/Noice";

const ModalDetaliiEchipament = ({ open, file, handleClose }) => {
  const dispatch = useDispatch();

  const handover = useSelector((state) => state.predare);
  const retur = useSelector((state) => state.retur);

  const exitsColumns = IT_EQUIP_DETAILS_MODAL_PV_COLUMNS();
  const serviceColumns = IT_EQUIP_DETAILS_MODAL_SERVICE_COLUMNS();
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
                        ? "Iesiri"
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
        <Box className="eq-pvInfo">
          <DialogTitle> Iesiri </DialogTitle>
          <DetailsTable data={pv} columns={exitsColumns} />
        </Box>
        <hr />
        <Box className="eq-service">
          <DialogTitle> Service-uri </DialogTitle>
          <DetailsTable data={[]} columns={serviceColumns} />
        </Box>
        <hr />
        <Box className="eq-inventory">
          <DialogTitle> Inventare </DialogTitle>
          <DetailsTable data={[]} columns={inventoryColumns} />
        </Box>
        <hr />
        <Box className="eq-service">
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

export default ModalDetaliiEchipament;
