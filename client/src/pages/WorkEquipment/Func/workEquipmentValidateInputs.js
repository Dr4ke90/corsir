export function workEquipmentValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    marime: !validateRequired(obj.marime) ? "Marimea este obligatorie" : "",
    tip: !validateRequired(obj.tip) ? "Tipul este obligatoriu" : "",
    pret: !validateRequired(obj.pret) ? "Pretul este obligatoriu" : "",
    stocNou: !validateRequired(obj.stocNou)
      ? "Cantitatea este obligatorie"
      : "",
  };
}
