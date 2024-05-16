export function handoverValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    cantitate: !validateRequired(obj.cantitate)
      ? "Cantitatea este obligatorie"
      : "",
  };
}
