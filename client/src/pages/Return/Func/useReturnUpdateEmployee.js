import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/usersSlice";

export const useReturnUpdateEmployee = () => {
  const dispatch = useDispatch();

  const returnUpdateEmployee = (employees, sheet) => {
    const predator = employees.find(
      (angajat) => angajat.nume === sheet.predator
    );

    if (predator) {
      const filteredEquipment = predator.echipamente.filter(
        (eq) => !sheet.echipament.some((item) => item.id === eq.id)
      );

      dispatch(
        updateUser({
          ...predator,
          echipamente: filteredEquipment,
        })
      );
    }
  };
  return returnUpdateEmployee;
};
