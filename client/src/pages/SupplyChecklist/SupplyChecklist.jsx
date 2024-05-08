import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  deleteFisaNecesar,
  fetchNecesar,
  updateFisa,
} from "../../redux/slices/necesarSlice";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import ModalNecesar from "./SupplyChecklistCreateModal";
import ModalDetaliiNecesar from "./SupplyChecklistDetailsModal";
import { SUPPLY_CHECKLIST_FILE_INITIAL_STATE } from "./Data/supplyChecklistFileInitialState";
import { SUPPLY_CHECKLIST_MATERIAL_TABLE_COLUMNS } from "./Data/supplyChecklistMaterialTableColumns";

const SupplyChecklist = () => {
  const dispatch = useDispatch();

  const necesarState = useSelector((state) => state.necesar);
  const data = useMemo(() => necesarState.slice().reverse(), [necesarState]);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(
    SUPPLY_CHECKLIST_FILE_INITIAL_STATE
  );

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
    dispatch(fetchNecesar());
  }, [dispatch]);

  const handleUpdateFile = async ({ values, table }) => {
    dispatch(updateFisa(values));
    table.setEditingRow(null);
  };

  const handleDeleteFile = (fisa) => {
    dispatch(deleteFisaNecesar(fisa));
  };

  const tableProps = {
    data,
    columns : SUPPLY_CHECKLIST_MATERIAL_TABLE_COLUMNS(),
    handleOpenCreateModal,
    handleOpenModalDetalii,
    handleUpdate: handleUpdateFile,
    handleDelete: handleDeleteFile,
  };

  const dialogProps = {
    data,
    handleOpenCreateModal,
  };

  return (
    <div className="necesar">
      <MuiTable props={tableProps} />

      <ModalNecesar open={isOpenCreateModal} dialogProps={dialogProps} />

      <ModalDetaliiNecesar
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
};

export default SupplyChecklist;
