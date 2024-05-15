import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { WORK_EQUIPMENT_MATERIAL_TABLE_COLUMNS } from "./Data/workEquipmentMaterialTableColumns";
import { WORK_EQUIPMENT_INITIAL_STATE } from "./Data/workEquipmentInitialState";
import WorkEquipmentDetailsModal from "./WorkEquipmentDetailsModal";
import WorkEquipmentAddModal from "./WorkEquipmentAddModal";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import {
  deleteWorkEquipment,
  fetchWorkEquipmentList,
  updateWorkEquipment,
} from "../../redux/slices/workEquipmentSlice";

function WorkEquipment() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.workEquipmentList);

  const locations = useSelector((state) => state.locatii);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(
    WORK_EQUIPMENT_INITIAL_STATE
  );

  const columns = WORK_EQUIPMENT_MATERIAL_TABLE_COLUMNS();

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
    dispatch(fetchWorkEquipmentList());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleUpdateEquipment = async ({ values, table }) => {
    let pret;
    if (values.pret === "N/A") {
      pret = "";
    } else {
      pret = parseInt(values.pret);
    }

    dispatch(
      updateWorkEquipment({
        ...values,
        pret: pret,
      })
    );
    table.setEditingRow(null);
  };

  const handleDeleteEquipment = (eq) => {
    dispatch(deleteWorkEquipment(eq.id));
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const dialogProps = {
    data,
    handleOpenCreateModal,
  };

  const tableProps = {
    data,
    columns,
    handleOpenCreateModal,
    handleOpenModalDetalii,
    handleExportRows,
    handleUpdate: handleUpdateEquipment,
    handleExportAll: handleExportData,
    handleDelete: handleDeleteEquipment,
  };

  return (
    <div className="mobile-phones">
      <MuiTable props={tableProps} />

      <WorkEquipmentAddModal
        open={isOpenCreateModal}
        dialogProps={dialogProps}
      />

      <WorkEquipmentDetailsModal
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
}

export default WorkEquipment;
