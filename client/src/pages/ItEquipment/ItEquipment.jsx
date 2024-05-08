import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  deleteEchipament,
  fetchEchipament,
  updateEchipament,
} from "../../redux/slices/echipSlice";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ModalEquipment from "./ItEquipmentCreateModal";
import ModalDetaliiEchipament from "./ItEquipmentDetailsModal";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { IT_EQUIPMENT_INITIAL_STATE } from "./Data/itEquipmentInitialState";
import { IT_EQUIPMENT_MATERIAL_TABLE_COLUMNS } from "./Data/itEquipmentMaterialTableColumns";

function ItEquipment() {
  const dispatch = useDispatch();

  const echipament = useSelector((state) => state.echipament);
  const locations = useSelector((state) => state.locatii);
  const data = useMemo(() => echipament.slice().reverse(),[echipament]);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(IT_EQUIPMENT_INITIAL_STATE);

  const handleOpenCreateModal = () => {
    setIsOpenCreateModal(!isOpenCreateModal);
  };

  const handleOpenModalDetalii = (row) => {
    setIsOpenModalDetalii(!isOpenModalDetalii);
    if (row) {
      setSelectedFile(row.original);
    }
  };

  useEffect(() => {
    dispatch(fetchEchipament());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleUpdateEquipment = async ({ values, table }) => {
    let pret;
    if (typeof values.pret === "number") {
      pret = parseInt(values.pret);
    } else {
      pret = "";
    }

    dispatch(
      updateEchipament({
        ...values,
        pret: parseInt(pret),
      })
    );
    table.setEditingRow(null);
  };

  const handleDeleteEquipment = (eq) => {
    dispatch(deleteEchipament(eq.cit));
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(echipament);
    download(csvConfig)(csv);
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const dialogProps = {
    data: echipament,
    handleOpenCreateModal,
  };

  const tableProps = {
    data,
    columns: IT_EQUIPMENT_MATERIAL_TABLE_COLUMNS(locations),
    handleOpenCreateModal,
    handleOpenModalDetalii,
    handleExportRows,
    handleUpdate: handleUpdateEquipment,
    handleExportAll: handleExportData,
    handleDelete: handleDeleteEquipment,
  };

  return (
    <div className="echipament">
      <MuiTable props={tableProps} />

      <ModalEquipment open={isOpenCreateModal} dialogProps={dialogProps} />

      <ModalDetaliiEchipament
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
}

export default ItEquipment;
