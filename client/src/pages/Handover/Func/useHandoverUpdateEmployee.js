import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/usersSlice";

export const useHandoverUpdateEmployee = () => {
  const dispatch = useDispatch();

  const handoverUpdateEmployee = (angajati, fisa) => {
    const primitor = angajati.find((angajat) => angajat.nume === fisa.primitor);

    const filtered = fisa.echipament.map((eq) => eq.id);

    if (primitor) {
      dispatch(
        updateUser({
          ...primitor,
          echipamente: [...primitor.echipamente, ...filtered],
        })
      );
    } else {
      console.log("Angajatul nu exista");
      return;
    }
  };

  return handoverUpdateEmployee;
};
