export const WORK_EQUIPMENT_DETAILS_MODAL_PV_COLUMNS = (selectedFile) => {
  return [
    {
      accessorKey: "fisa",
      header: "Fisa",
      size: 60,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "data",
      header: "Data",
      size: 120,
      grow: true,
      enableEditing: false,
    },
    {
      accessorKey: "predator",
      header: "Predator",
      size: 120,
      grow: true,
      enableEditing: false,
    },
    {
      accessorKey: "primitor",
      header: "Primitor",
      size: 150,
      grow: true,
      enableEditing: false,
    },
    {
      header: "Nou",
      id: "Nou",
      accessorFn: (row) =>
        row.echipament.find(
          (eq) => eq.id === selectedFile.id && eq.stare === "Nou"
        )?.cantitate,
      size: 60,
      grow: true,
      enableEditing: false,
    },
    {
      header: "Uzat",
      id: "Uzat",
      accessorFn: (row) =>
        row.echipament.find(
          (eq) => eq.id === selectedFile.id && eq.stare === "Uzat"
        )?.cantitate,
      size: 60,
      grow: true,
      enableEditing: false,
    },
    {
      accessorKey: "locatie",
      header: "Locatie",
      size: 120,
      grow: true,
      enableEditing: false,
    },
  ];
};
