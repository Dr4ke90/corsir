import { useSelector } from "react-redux";

export const EMPLOYEES_MATERIAL_TABLE_COLUMNS = () => {
  const user = useSelector((state) => state.users.loggedUser);

  return [
    {
      accessorKey: "fisa",
      header: "Cod",
      size: 40,
      enableEditing: false,
    },
    {
      accessorKey: "nume",
      header: "Nume",
      size: 50,
      enableEditing: user.superuser ? true : false,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableEditing: user.superuser ? true : false,
      size: 120,
    },
    {
      accessorKey: "tel",
      header: "Telefon",
      enableEditing: user.superuser ? true : false,
      size: 100,
    },
    {
      accessorKey: "functie",
      header: "Functie",
      enableEditing: user.superuser ? true : false,
      size: 100,
    },
    {
      accessorKey: "locatie",
      header: "Locatie",
      enableEditing: user.superuser ? true : false,
      size: 100,
    },
    {
      accessorKey: "stare",
      header: "Stare",
      enableEditing: true,
      editSelectOptions: ["Activ", "Inactiv"],
      muiEditTextFieldProps: {
        select: true,
      },
      size: 50,
    },
  ];
};
