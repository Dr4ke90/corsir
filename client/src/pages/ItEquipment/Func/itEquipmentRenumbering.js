export const equipmentListRenumbering = (phoneList, startNr) => {
  if (phoneList.length === 0) {
    return [];
  }

  for (let i = 0; i < phoneList.length; i++) {
    const newCitNr = startNr + i;
    const paddedNr = newCitNr.toString().padStart(3, "0");
    const newCit = "CIT" + paddedNr;
    phoneList[i].cit = newCit;
  }

  return phoneList;
};
