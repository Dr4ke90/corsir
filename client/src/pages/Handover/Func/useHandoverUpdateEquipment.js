import { useDispatch } from "react-redux";
import { updateWorkEquipment } from "../../../redux/slices/workEquipmentSlice";

export const useHandoverUpdateEquipment = () => {
  const dispatch = useDispatch();

  const handoverUpdateEquipment = (workEquipment, fisa) => {
    fisa.echipament.forEach((addedEq) => {
      const filteredEquipments = workEquipment.filter(
        (item) => item.id === addedEq.id
      );

      filteredEquipments.forEach((eq) => {
        const eqUpdate = {
          ...eq,
          pv: [...eq.pv, fisa.fisa],
          cantitate: parseInt(eq.cantitate) - parseInt(addedEq.cantitate),
        };

        dispatch(updateWorkEquipment(eqUpdate));
      });
    });
  };

  return handoverUpdateEquipment;
};
