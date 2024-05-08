export function invoiceValidateInputs(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    achizitie: !validateRequired(obj.achizitie)
      ? "Data achizitiei este obligatorie"
      : "",
    vendor: !validateRequired(obj.vendor) ? "Vendorul este obligatoriu" : "",
    refFactura: !validateRequired(obj.refFactura)
      ? "Vendorul este obligatoriu"
      : "",
  };
}
