import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  fetchInventoryFiles,
  updateInventoryFile,
  deleteInventoryFile,
} from "../../redux/slices/inventarSlice";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import ModalInventar from "./ModalInvenar";
import { INV_INITIAL_STATE, INV_TABLE_COLUMNS } from "./inventarDatas";
import ModalDetaliiInventar from "./ModalDetaliiInventar";

const Inventory = ({departament}) => {
  const dispatch = useDispatch();
  const inventar = useSelector((state) => state.inventar);
  const data = useMemo(() => inventar.slice().reverse(), [inventar]);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(INV_INITIAL_STATE);

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
    dispatch(fetchInventoryFiles());
  }, [dispatch]);

  const handleRemoveFile = (fisa) => {
    dispatch(deleteInventoryFile(fisa));
  };

  const handleUpdateFile = ({ values, table }) => {
    const fileToUpdate = data.find((file) => file.fisa === values.fisa);

    dispatch(updateInventoryFile({ ...fileToUpdate, stare: values.stare }));

    table.setEditingRow(null);
  };

  const dialogProps = {
    data,
    handleOpenCreateModal,
  };

  const tableProps = {
    data,
    columns: INV_TABLE_COLUMNS(),
    departament,
    handleOpenCreateModal,
    handleOpenModalDetalii,
    handleUpdate: handleUpdateFile,
    handleDelete: handleRemoveFile,
  };
  return (
    <div className="inventar">
      <MuiTable props={tableProps} />

      <ModalInventar open={isOpenCreateModal} dialogProps={dialogProps} />

      <ModalDetaliiInventar
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      />
    </div>
  );
};
//
export default Inventory;
