export const createFileNumber = (data, type) => {
  let newFileNumber = "";
  if (data.length === 0) {
    const firstNr = data.length + 1;
    const paddedNr = firstNr.toString().padStart(4, "0");
    newFileNumber = type + paddedNr;
  } else {
    let lastItem = data[0];
    let lastNr;

    if (lastItem.fisa.includes("INV")) {
      lastNr = parseInt(lastItem.fisa.slice(3)) + 1;
    } else {
      lastNr = parseInt(lastItem.fisa.slice(1)) + 1;
    }
    const paddedNr = lastNr.toString().padStart(4, "0");
    newFileNumber = type + paddedNr;
  }
  return newFileNumber;
};
