export const SUPPLY_CHECKLIST_DETAILS_MODAL_COLUMNS = () => [
  {
    accessorKey: "nr",
    header: "nrCrt",
    size: 30,
    grow: false,
    enableEditing: false,
  },
  {
    accessorKey: "echipament",
    header: "Echipament",
    size: 280,
    grow: true,
    enableEditing: false,
  },
  {
    accessorKey: "cantitate", //normal accessorKey
    header: "QTY",
    size: 40,
    grow: true,
    enableEditing: false,
  },
  {
    accessorKey: "um",
    header: "U.M",
    size: 40,
    grow: true,
    enableEditing: false,
  },

  {
    id: "total",
    header: "Total",
    accessorFn: (row) => `${row.total} RON`,
    size: 60,
    grow: true,
    enableEditing: false,
  },
];
