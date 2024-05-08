export const createNewCtmNumber = (fullEqList, usedEq) => {
  const equipment = [...fullEqList, ...usedEq];
  let newCit = "";

  if (equipment.length === 0) {
    const lastCit = equipment.length + 1;
    const paddedNr = lastCit.toString().padStart(3, "0");
    newCit = "CTM" + paddedNr;
    return newCit;
  } else {
    console.log( parseInt(equipment[equipment.length - 1].cit.substring(3)) + 1);

    const lastCit =
      parseInt(equipment[equipment.length - 1].cit.substring(3)) + 1;
    const paddedNr = lastCit.toString().padStart(3, "0");
    newCit = "CTM" + paddedNr;

    return newCit;
  }
};
