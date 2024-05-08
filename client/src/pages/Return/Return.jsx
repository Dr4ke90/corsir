import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  deleteFisaRetur,
  fetchFiseRetur,
  updateFisaRetur,
} from "../../redux/slices/returSlice";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import ModalRetur from "./ReturnCreateModal";
import ModalDetaliiRetur from "./ReturnDetailsModal";
import { RETUR_COLOANE_TABEL_PRINCIPAL } from "./Data/returnMaterialTableColumns";
import { RETURN_FILE_INITIAL_STATE } from "./Data/returnFileInitialState";

function Return() {
  const dispatch = useDispatch();
  const retur = useSelector((state) => state.retur);
  const data = useMemo(() => retur.slice().reverse(), [retur]);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(RETURN_FILE_INITIAL_STATE);

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
    dispatch(fetchFiseRetur());
  }, [dispatch]);

  const handleRemoveFile = (fisa) => {
    dispatch(deleteFisaRetur(fisa));
  };

  const handleUpdateFile = ({ values, table }) => {
    dispatch(updateFisaRetur(values));
    table.setEditingRow(null);
  };

  const dialogProps = {
    data,
    handleOpenCreateModal,
  };

  const tableProps = {
    columns: RETUR_COLOANE_TABEL_PRINCIPAL(),
    data,
    handleOpenCreateModal,
    handleOpenModalDetalii,
    handleUpdate: handleUpdateFile,
    handleDelete: handleRemoveFile,
  };

  return (
    <div className="retur-eq">
      <MuiTable props={tableProps} />

      <ModalRetur open={isOpenCreateModal} dialogProps={dialogProps} />

      <ModalDetaliiRetur
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
}

export default Return;
