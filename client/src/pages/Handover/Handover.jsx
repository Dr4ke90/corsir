import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  deleteFisaPredare,
  fetchFisePredare,
  updateFisaPredare,
} from "../../redux/slices/predareSlice";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import HandoverCreateModal from "./HandoverCreateModal";
import HandoverDetailsModal from "./HandoverDetailsModal";
import { PREDARE_MUI_TABLE_COLUMNS } from "./Data/handoverMaterialTableColumns";
import { HANDOVER_FILE_INITIAL_STATE } from "./Data/handoverFileInitialState";
import { useLocation } from "react-router-dom";
import HandoverCreateModalWEq from "./HandoverCreateModalWEq";

const Handover = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const listaPredare = useSelector((state) => state.predare);

  const data = useMemo(() => listaPredare.slice().reverse(), [listaPredare]);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(HANDOVER_FILE_INITIAL_STATE);

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
    dispatch(fetchFisePredare());
  }, [dispatch]);

  const handleUpdateFile = async ({ values, table }) => {
    dispatch(updateFisaPredare(values));
    table.setEditingRow(null);
  };

  const handleDeleteFile = async (file) => {
    dispatch(deleteFisaPredare(file));
  };

  const dialogProps = {
    handleOpenCreateModal,
    data,
  };

  const tableProps = {
    columns: PREDARE_MUI_TABLE_COLUMNS(),
    data,
    handleOpenCreateModal,
    handleOpenModalDetalii,
    handleUpdate: handleUpdateFile,
    handleDelete: handleDeleteFile,
  };

  return (
    <div className="predare-eq">
      <MuiTable props={tableProps} />

      {location.pathname.includes("tehnic") ? (
        <HandoverCreateModalWEq
          open={isOpenCreateModal}
          dialogProps={dialogProps}
        />
      ) : (
        <HandoverCreateModal
          open={isOpenCreateModal}
          dialogProps={dialogProps}
        />
      )}

      <HandoverDetailsModal
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
};

export default Handover;
