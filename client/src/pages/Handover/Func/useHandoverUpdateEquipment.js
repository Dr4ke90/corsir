import { useDispatch } from "react-redux";
import { updateWorkEquipment } from "../../../redux/slices/workEquipmentSlice";

export const useHandoverUpdateEquipment = () => {
  const dispatch = useDispatch();

  const handoverUpdateEquipment = (addedEquipment, fisa) => {
    const updates = {};

    addedEquipment.forEach((eq) => {
      const id = eq.id;

      if (!updates[id]) {
        updates[id] = {
          ...eq,
          pv: [...eq.pv, fisa.fisa],
          stocNou:
            eq.stare === "Nou"
              ? parseInt(eq.stocNou) - parseInt(eq.cantitate)
              : parseInt(eq.stocNou),
          stocUzat:
            eq.stare === "Uzat"
              ? parseInt(eq.stocUzat) - parseInt(eq.cantitate)
              : parseInt(eq.stocUzat),
        };
      } else {
        updates[id] = {
          ...updates[id],
          pv: [...updates[id].pv, fisa.fisa],
          stocNou:
            eq.stare === "Nou"
              ? updates[id].stocNou - parseInt(eq.cantitate)
              : updates[id].stocNou,
          stocUzat:
            eq.stare === "Uzat"
              ? updates[id].stocUzat - parseInt(eq.cantitate)
              : updates[id].stocUzat,
        };
      }
    });

    Object.values(updates).forEach((eqUpdate) => {
      delete eqUpdate.cantitate;
      dispatch(updateWorkEquipment(eqUpdate));
    });
  };

  return handoverUpdateEquipment;
};
