import { useSelector } from "react-redux";
import { IT_EQUIPMENT_TYPES } from "../ItEquipment/Data/ItEquipmentTypes";

export const INV_INITIAL_STATE = {
  fisa: "",
  data: "",
  responsabil: "",
  locatie: "",
  echipament: [],
  stare: "",
};

export const INV_TABLE_COLUMNS = () => {
  const user = useSelector((state) => state.users.loggedUser);

  return [
    {
      accessorKey: "fisa",
      header: "Fisa",
      size: 50,
      enableEditing: false,
    },

    {
      accessorKey: "data",
      header: "Data",
      enableEditing: user.superuser ? true : false,
    },
    {
      accessorKey: "responsabil",
      header: "Responsabil",
      enableEditing: user.superuser ? true : false,
    },
    {
      accessorKey: "locatie",
      header: "Locatie",
      enableEditing: user.superuser ? true : false,
    },
    {
      id: "echipament",
      header: "Echipamente",
      enableEditing: false,
      accessorFn: (row) => `${row.echipament.length}`,
    },
    {
      accessorKey: "stare",
      header: "Stare",
      enableEditing: (row) =>
        (row.original.stare && row.original.stare === "Inchis") ||
        !user.superuser
          ? false
          : true,
      editSelectOptions: ["Creat", "Deschis", "Inchis"],
      muiEditTextFieldProps: {
        select: true,
      },
    },
  ];
};

export const DIALOG_TABLE_COLUMNS = (locatii, onCreateMode) => [
  {
    accessorKey: "cit",
    header: "CIT",
    size: 40,
    grow: false,
    enableEditing: onCreateMode ? true : false,
  },
  {
    accessorKey: "tip",
    header: "Tip",
    size: 50,
    grow: false,
    enableEditing: false,
  },
  {
    accessorKey: "model",
    header: "Model",
    size: 50,
    grow: false,
    enableEditing: onCreateMode ? false : true,
  },
  {
    accessorKey: "serie",
    header: "Serie",
    size: 150,
    grow: false,
    enableEditing: onCreateMode ? false : true,
  },
  {
    accessorKey: "pret",
    header: "Pret",
    size: 80,
    grow: false,
    enableEditing: onCreateMode ? false : true,
  },
  {
    accessorKey: "stare",
    header: "Stare",
    id: "stare",
    size: 80,
    grow: true,
    editSelectOptions: IT_EQUIPMENT_TYPES,
    enableEditing: onCreateMode ? false : true,
    muiEditTextFieldProps: {
      select: true,
    },
  },
  {
    accessorKey: "persoana",
    header: "Persoana",
    size: 150,
    grow: false,
    enableEditing: onCreateMode ? false : true,
  },
  {
    accessorKey: "locatie",
    header: "Locatie",
    size: 80,
    grow: false,
    enableEditing: onCreateMode ? false : true,
    editSelectOptions: locatii,
    muiEditTextFieldProps: {
      select: true,
    },
  },
];
