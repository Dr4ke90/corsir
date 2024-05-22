export function handoverValidateFileData(obj) {
    const validateRequired = (value) => !!value.length;
    return {
      primitor: !validateRequired(obj.primitor)
        ? "Numele primitorului este obligatoriu"
        : "",
      locatie: !validateRequired(obj.locatie) ? "Locatia este obligatorie" : "",
    };
  }
  