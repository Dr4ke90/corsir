import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { IT_EQUIPMENT_STATE_SELECTION } from "./itEquipmentStateSelection";
import { IT_EQUIPMENT_TYPES } from "./ItEquipmentTypes";

export const IT_EQUIPMENT_MATERIAL_TABLE_COLUMNS = (locations) => {
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
      size: 100,
      grow: false,
      enableEditing: loggedUser.superuser ? true : false,
      editSelectOptions: IT_EQUIPMENT_TYPES,
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
      accessorKey: "model",
      header: "Model",
      size: 180,
      grow: false,
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
      header: "Serie",
      size: 100,
      grow: false,
      enableEditing: loggedUser.superuser ? true : false,
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
    },
    {
      accessorKey: "pret",
      header: "Pret",
      size: 50,
      grow: false,
      filterFn: "between",
      enableEditing: loggedUser.superuser ? true : false,
      muiEditTextFieldProps: {
        type: "number",
      },
      enableClickToCopy: true,
      muiCopyButtonProps: {
        fullWidth: true,
        // startIcon: <ContentCopy />,
        sx: { justifyContent: "flex-start" },
      },
      Cell: ({ cell }) => (
        <Box
          component="span"
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() < 2000
                ? theme.palette.success.dark
                : cell.getValue() >= 2000 && cell.getValue() < 3000
                ? theme.palette.warning.light
                : theme.palette.error.dark,
            borderRadius: "0.25rem",
            color: "#fff",
            maxWidth: "9ch",
            p: "0.25rem",
          })}
        >
          {cell.getValue()?.toLocaleString?.("ro-RO", {
            style: "currency",
            currency: "RON",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Box>
      ),
    },
    {
      accessorKey: "stare",
      header: "Status",
      size: 60,
      grow: false,
      required: true,
      enableEditing: true,

      editSelectOptions: IT_EQUIPMENT_STATE_SELECTION,
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
      size: 70,
      grow: false,
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
      size: 70,
      grow: false,
      enableEditing: loggedUser.superuser ? true : false,
      editSelectOptions: Array.isArray(locations)
        ? locations.map((item) => item.proiect)
        : [],
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
