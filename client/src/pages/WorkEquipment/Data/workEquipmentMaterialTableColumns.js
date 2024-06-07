import { useSelector } from "react-redux";

export const WORK_EQUIPMENT_MATERIAL_TABLE_COLUMNS = () => {
  const loggedUser = useSelector((state) => state.users.loggedUser);

  return [
    {
      accessorKey: "id",
      header: "ID",
      size: 30,
      enableEditing: false,
      grow: false,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },

    {
      accessorKey: "tip",
      header: "Tip",
      size: 110,
      grow: true,
      enableEditing: loggedUser.superuser ? true : false,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "marime",
      header: "Marime",
      size: 60,
      grow: true,
      enableEditing: loggedUser.superuser ? true : false,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "stocNou",
      header: "Stoc (NOU)",
      size: 60,
      grow: true,
      enableEditing: true,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "stocUzat",
      header: "Stoc (UZAT)",
      size: 60,
      grow: true,
      enableEditing: true,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "predat",
      header: "Predat",
      size: 60,
      grow: true,
      enableEditing: true,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      id: "achizitie",
      accessorFn: (row) => row.intrari[row.intrari.length - 1]?.achizitie,
      header: "Ultima intrare",
      size: 90,
      grow: true,
      enableEditing: true,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      id: "inventar",
      accessorFn: (row) => row.inventar[row.inventar.length - 1]?.data,
      header: "Ultimul Inv.",
      size: 90,
      grow: true,
      enableEditing: true,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
  ];
};
