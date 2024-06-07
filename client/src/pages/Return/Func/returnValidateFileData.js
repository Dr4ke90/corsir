export function returnValidateFileData(obj) {
  const validateRequired = (value) => !!value.length;
  return {
    primitor: !validateRequired(obj.primitor) ? "Secteaza primitorul" : "",
    predator: !validateRequired(obj.predator) ? "Selecteaza predatorul" : "",
    locatie: !validateRequired(obj.locatie) ? "Selecteaza locatia" : "",
  };
}
