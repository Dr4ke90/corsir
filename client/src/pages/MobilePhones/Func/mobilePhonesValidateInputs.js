export function mobilePhonesValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    model: !validateRequired(obj.model) ? "Modelul este obligatoriu" : "",
  };
}
