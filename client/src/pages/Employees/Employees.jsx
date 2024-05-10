import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import MuiTable from "../../components/MaterialUiTable/MuiTable";
import { deleteEmployee, fetchAllUsers } from "../../redux/slices/usersSlice";
import ModalCreateUsers from "./EmployeesCreateModal";
import { EMPLOYEES_MATERIAL_TABLE_COLUMNS } from "./Data/employeesMaterialTableColumns";
import { EMPLOYEE_INITIAL_STATE } from "./Data/employeeInitialState";

const Employees = () => {
  const dispatch = useDispatch();
  const utilizatori = useSelector((state) => state.users.allUsers);

  const data = useMemo(
    () =>
      Array.isArray(utilizatori)
        ? utilizatori.filter((user) => user.username !== "coral")
        : [],
    [utilizatori]
  );

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [isOpenModalDetalii, setIsOpenModalDetalii] = useState(false);

  const [isOnEditMode, setIsOnEditMode] = useState(false);

  const [selectedFile, setSelectedFile] = useState(EMPLOYEE_INITIAL_STATE);

  const handleOpenCreateModal = (row) => {
    setIsOpenCreateModal(!isOpenCreateModal);
    if (row) {
      setSelectedFile(row.original);
    }
  };

  const handleOpenModalDetalii = (row) => {
    setIsOpenModalDetalii(!isOpenModalDetalii);
    if (row) {
      setSelectedFile(row.original);
    }
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDeleteEmployee = (employee) => {
    dispatch(deleteEmployee(employee.fisa));
  };

  const dialogProps = {
    data,
    selectedFile,
    isOnEditMode,
    handleOpenCreateModal,
    setIsOnEditMode,
  };

  const tableProps = {
    data,
    columns: EMPLOYEES_MATERIAL_TABLE_COLUMNS(),
    handleOpenCreateModal,
    handleOpenModalDetalii,
    setIsOnEditMode,
    handleDelete: handleDeleteEmployee,
  };
  return (
    <div className="inventar">
      <MuiTable props={tableProps} />

      <ModalCreateUsers open={isOpenCreateModal} dialogProps={dialogProps} />

      {/* <ModalDetaliiInventar
        open={isOpenModalDetalii}
        file={selectedFile}
        handleClose={handleOpenModalDetalii}
      /> */}
    </div>
  );
};
//
export default Employees;
