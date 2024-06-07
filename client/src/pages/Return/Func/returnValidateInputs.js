export function returnValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    id: !validateRequired(obj.id) ? "Selecteaza ID" : "",
    cantitate: !validateRequired(obj.cantitate)
      ? "Cantitatea este obligatorie"
      : "",
  };
}
