import { useSelector } from "react-redux";
import { WORK_EQUIPMENT_STATE_SELECTION } from "./workEquipmentStateSelection";

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
      accessorKey: "marime",
      header: "Marime",
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
      accessorKey: "cantitate",
      header: "Cantitate",
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

      editSelectOptions: WORK_EQUIPMENT_STATE_SELECTION,
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
      accessorKey: "achizitie",
      header: "Achizitie",
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
  ];
};
