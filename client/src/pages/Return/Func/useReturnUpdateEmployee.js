import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/usersSlice";

export const useReturnUpdateEmployee = () => {
  const dispatch = useDispatch();

  const returnUpdateEmployee = (employees, sheet) => {
    const predator = employees.find(
      (angajat) => angajat.nume === sheet.predator
    );

    if (predator) {
      const updatedEchipamente = predator.echipamente.filter(
        (eq) => !sheet.echipament.some((item) => item.id === eq)
      );

      dispatch(
        updateUser({
          ...predator,
          echipamente: updatedEchipamente,
        })
      );
    }
  };
  return returnUpdateEmployee;
};
