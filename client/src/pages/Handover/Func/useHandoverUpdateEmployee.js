import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/usersSlice";

export const useHandoverUpdateEmployee = () => {
  const dispatch = useDispatch();

  const handoverUpdateEmployee = (angajati, fisa) => {
    const primitor = angajati.find((angajat) => angajat.nume === fisa.primitor);

    if (primitor) {
      dispatch(
        updateUser({
          ...primitor,
          echipamente: [...primitor.echipamente, ...fisa.echipament],
        })
      );
    } else {
      console.log("Angajatul nu exista");
      return;
    }
  };

  return handoverUpdateEmployee;
};
