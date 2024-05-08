import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  fetchFisePredare,
  updateFisaPredare,
} from "../../redux/slices/predareSlice";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import ModalPredare from "./HandoverCreateModal";
import ModalDetaliiPredare from "./HandoverDetailsModal";
import { PREDARE_MUI_TABLE_COLUMNS } from "./Data/handoverMaterialTableColumns";
import { HANDOVER_FILE_INITIAL_STATE } from "./Data/handoverFileInitialState";
import { fetchMobilePhones } from "../../redux/slices/mobilePhonesSlice";

const Handover = () => {
  const dispatch = useDispatch();

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
    dispatch(fetchMobilePhones());
  }, [dispatch]);

  const handleUpdateFile = async ({ values, table }) => {
    dispatch(updateFisaPredare(values));
    table.setEditingRow(null);
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
  };

  return (
    <div className="predare-eq">
      <MuiTable props={tableProps} />

      <ModalPredare open={isOpenCreateModal} dialogProps={dialogProps} />

      <ModalDetaliiPredare
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
};

export default Handover;
