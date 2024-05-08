import { useSelector } from "react-redux";

export const RETUR_COLOANE_TABEL_PRINCIPAL = () => {
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
      accessorKey: "predator",
      header: "Predator",
      enableEditing: user.superuser ? true : false,
    },
    {
      accessorKey: "primitor",
      header: "Primitor",
      enableEditing: user.superuser ? true : false,
    },
    {
      accessorKey: "locatie",
      header: "Locatie",
      enableEditing: user.superuser ? true : false,
    },
  ];
};
