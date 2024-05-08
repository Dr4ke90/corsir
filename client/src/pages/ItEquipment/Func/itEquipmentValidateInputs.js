export function itEquipmentValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    model: !validateRequired(obj.model) ? "Modelul este obligatoriu" : "",
    tip: !validateRequired(obj.tip) ? "Tipul este obligatoriu" : "",
    pret: !validateRequired(obj.pret) ? "Pretul este obligatoriu" : "",
  };
}
