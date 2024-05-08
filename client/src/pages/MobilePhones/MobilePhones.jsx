import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  deleteEchipament,
  updateEchipament,
} from "../../redux/slices/echipSlice";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { fetchLocations } from "../../redux/slices/locationsSlice";
import { MOBILE_PHONES_MATERIAL_TABLE_COLUMNS } from "./Data/mobilePhonesMaterialTableColumns";
import { fetchMobilePhones } from "../../redux/slices/mobilePhonesSlice";
import AddMobilePhonesModall from "./MobilePhonesAddModal";
import { MOBILE_PHONE_INITIAL_STATE } from "./Data/mobilePhoneInitialState";
import MobilePhonesDetailsModal from "./MobilePhonesDetailsModal";

function MobilePhones() {
  const dispatch = useDispatch();

  const mobilePhones = useSelector((state) => state.telefoane);
  const locations = useSelector((state) => state.locatii);
  const data = useMemo(() => mobilePhones.slice().reverse(), [mobilePhones]);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(MOBILE_PHONE_INITIAL_STATE);

  const columns = MOBILE_PHONES_MATERIAL_TABLE_COLUMNS(locations)

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
    dispatch(fetchMobilePhones());
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
    const csv = generateCsv(csvConfig)(mobilePhones);
    download(csvConfig)(csv);
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const dialogProps = {
    data: mobilePhones,
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

      <AddMobilePhonesModall
        open={isOpenCreateModal}
        dialogProps={dialogProps}
      />

      <MobilePhonesDetailsModal
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
}

export default MobilePhones;
