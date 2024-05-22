export function handoverValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    cantitate: !validateRequired(obj.cantitate)
      ? "Cantitatea este obligatorie"
      : "",
    stare: !validateRequired(obj.stare) ? "Starea este obligatorie" : "",
    id: !validateRequired(obj.id) ? "Selectati ID" : "",
  };
}
