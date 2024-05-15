export function workEquipmentValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    marime: !validateRequired(obj.marime) ? "Marimea este obligatorie" : "",
    tip: !validateRequired(obj.tip) ? "Tipul este obligatoriu" : "",
    cantitate: !validateRequired(obj.cantitate)
      ? "Cantitatea este obligatorie"
      : "",
  };
}
