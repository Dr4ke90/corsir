import { useSelector } from "react-redux";
import { MOBILE_PHONES_STATE_SELECTION } from "./mobilePhonesStateSelection";

export const MOBILE_PHONES_MATERIAL_TABLE_COLUMNS = (locations) => {
  const loggedUser = useSelector((state) => state.users.loggedUser);

  return [
    {
      accessorKey: "cit",
      header: "CIT",
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
      accessorKey: "model",
      header: "Model",
      size: 180,
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
      accessorKey: "serie",
      header: "IMEI",
      size: 100,
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
      accessorKey: "phoneNr",
      header: "Nr Tel.",
      size: 100,
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
      accessorKey: "stare",
      header: "Stare",
      size: 80,
      grow: true,
      required: true,
      enableEditing: true,

      editSelectOptions: MOBILE_PHONES_STATE_SELECTION,
      muiEditTextFieldProps: {
        select: true,
      },
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },

    {
      accessorKey: "persoana",
      header: "Persoana",
      enableEditing: loggedUser.superuser ? true : false,
      size: 80,
      Edit: () => null,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "locatie",
      header: "Locatie",
      enableEditing: loggedUser.superuser ? true : false,
      editSelectOptions: locations.map((item) => item.proiect),
      muiEditTextFieldProps: {
        select: true,
      },
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
  ];
};
