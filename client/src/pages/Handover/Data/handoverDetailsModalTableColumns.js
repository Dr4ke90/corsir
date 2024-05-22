export const PREDARE_MODAL_DETALII_COLUMNS = (file) => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 40,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "tip",
      header: "Tip",
      size: 80,
      grow: true,
      enableEditing: false,
    },
    {
      accessorKey: file.dep === "it" ? "model" : "marime",
      header: file.dep === "it" ? "Model" : "Marime",
      size: file.dep === "it" ? 220 : 100,
      grow: true,
      enableEditing: false,
    },
    {
      accessorKey: file.dep === "it" ? "serie" : "stocNou",
      header: file.dep === "it" ? "Serie" : "Stoc (NOU)",
      size: file.dep === "it" ? 130 : 80,
      grow: true,
      enableEditing: false,
    },
    {
      accessorKey: file.dep === "it" ? "vendor" : "stocUzat",
      header: file.dep === "it" ? "Vendor" : "Stoc (Uzat)",
      size: 80,
      grow: true,
      enableEditing: false,
    },
    {
      header: "Pret",
      size: 80,
      grow: true,
      enableEditing: false,
      ...(file.dep === "it"
        ? { accessorKey: "pret" }
        : { accessorFn: (row) => (row.intrari ? row.intrari[0].pret : "") }),
    },
    {
      header: file.dep === "it" ? "Data Achizitie" : "Ultima Achizitie",
      size: 130,
      grow: true,
      enableEditing: false,
      ...(file.dep === "it"
        ? { accessorKey: "achizitie" }
        : {
            accessorFn: (row) => (row.intrari ? row.intrari[0].achizitie : ""),
          }),
    },
  ];
};
