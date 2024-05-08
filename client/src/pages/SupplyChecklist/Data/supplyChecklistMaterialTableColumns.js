import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export const SUPPLY_CHECKLIST_MATERIAL_TABLE_COLUMNS = () => {
  const user = useSelector((state) => state.users.loggedUser);

  return [
    {
      accessorKey: "fisa",
      header: "Fisa",
      enableEditing: false,
      size: 30,
    },
    {
      accessorKey: "data",
      header: "Data",
      size: 40,
      enableEditing: user.superuser ? true : false,
    },
    {
      id: "creat",
      header: "Creat",
      enableEditing: user.superuser ? true : false,
      size: 200,
      accessorFn: (row) => row.creat,
    },
    {
      accessorKey: "totalFisa",
      header: "Total general",
      size: 120,
      filterFn: "between",
      enableEditing: user.superuser ? true : false,
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
      header: "Stare",
      enableEditing: true,
      editSelectOptions: ["Aprobat", "In asteptare", "Respins", "Null"],
      muiEditTextFieldProps: {
        select: true,
      },
      Cell: ({ cell }) => (
        <Box
          component="span"
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === "Aprobat"
                ? theme.palette.success.dark
                : cell.getValue() === "In asteptare"
                ? theme.palette.warning.light
                : theme.palette.error.dark,
            borderRadius: "0.25rem",
            color: "#fff",
            maxWidth: "9ch",
            p: "0.25rem",
          })}
        >
          {cell.getValue()}
        </Box>
      ),
    },
  ];
};
