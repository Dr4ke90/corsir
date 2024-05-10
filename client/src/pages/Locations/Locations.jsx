import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import { Box } from "@mui/material";
import {
  deleteLocation,
  fetchLocations,
  updateLocation,
} from "../../redux/slices/locationsSlice";
import { LOCATIONS_MATERIAL_TABLE_COLUMNS } from "./Data/locationsMaterialTableColumns";

const Locations = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.locatii);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

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
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleUpdateLocation = async ({ values, table }) => {
    dispatch(updateLocation(values));
    table.setEditingRow(null);
  };

  const handleDeleteLocations = (proiect) => {
    dispatch(deleteLocation(proiect));
  };

  const tableProps = {
    data,
    columns: LOCATIONS_MATERIAL_TABLE_COLUMNS(),
    handleOpenCreateModal,
    handleOpenModalDetalii,
    handleUpdate: handleUpdateLocation,
    handleDelete: handleDeleteLocations,
  };

  //   const dialogProps = {
  //     data,
  //     user,
  //     handleOpenCreateModal,
  //   };

  return (
    <Box className="locatii">
      <MuiTable props={tableProps} />

      {/* <ModalNecesar open={isOpenCreateModal} dialogProps={dialogProps} />

      <ModalDetaliiNecesar
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      /> */}
    </Box>
  );
};

export default Locations;
