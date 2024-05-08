import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";

const NecesarModalTable = ({ dialogTableProps }) => {
  const { data, handleRemoveEquipment } = dialogTableProps;

  const [rowSelection, setRowSelection] = useState("");

  const columns = useMemo(
    () => [
      {
        accessorKey: "echipament",
        header: "Echipament",
        size: 300,
        grow: false,
        enableEditing: false,
      },
      {
        accessorKey: "cantitate",
        header: "Cantitate",
        size: 50,
        grow: true,
        enableEditing: false,
      },
      {
        accessorKey: "pret", //normal accessorKey
        header: "Pret (BUC)",
        size: 50,
        grow: true,
        enableEditing: false,
      },
      {
        accessorKey: "total",
        header: "Total",
        size: 50,
        grow: true,
        enableEditing: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableFilters: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableEditing: true,
    editDisplayMode: "cell",
    displayColumnDefOptions: {
      "mrt-row-numbers": {
        size: 0,
        grow: false, //new in v2.8 (allow this column to grow to fill in remaining space)
      },
    },
    initialState: { density: "compact", expanded: false },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () =>
        setRowSelection({
          [row.id]: !rowSelection[row.id],
        }),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    enableRowActions: true,
    renderRowActions: ({ row, table }) => {
      return (
        <Box sx={{ display: "flex", gap: "0.1rem" }}>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleRemoveEquipment(row.original.echipament)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
    enableTopToolbar: false,
    muiTablePaperProps: {
      sx: {
        width: "100%",
        height: "400px",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default NecesarModalTable;
