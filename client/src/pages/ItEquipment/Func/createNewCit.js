export const createNewCit = (fullEqList, usedEq) => {
    const equipment = [...fullEqList, ...usedEq];
    let newCit = "";
  
    if (equipment.length === 0) return;
  
    const lastCit =
      parseInt(equipment[equipment.length - 1].cit.substring(3)) + 1;
    const paddedNr = lastCit.toString().padStart(3, "0");
    newCit = "CIT" + paddedNr;
  
    return newCit;
  };