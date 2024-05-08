import { useSelector } from "react-redux";

export const LOCATIONS_MATERIAL_TABLE_COLUMNS = () => {
  const user = useSelector((state) => state.users.loggedUser);

  return [
    {
      accessorKey: "proiect",
      header: "Proiect",
      enableEditing: false,
      size: 30,
    },
    {
      accessorKey: "proprietar",
      header: "Proprietar",
      size: 40,
      enableEditing: user.superuser ? true : false,
    },
    {
      accessorKey: "pmTeam",
      header: "PM Team",
      enableEditing: user.superuser ? true : false,
      size: 200,
    },

    {
      accessorKey: "adresa",
      header: "Adresa",
      enableEditing: true,
    },
    {
      id: "contact",
      header: "Contact",
      enableEditing: true,
      Cell: ({ row }) =>
        row.original.contact.map((c) => {
          return <p key={c.nume}>{`${c.nume} - ${c.mobil}`}</p>;
        }),
    },
  ];
};
