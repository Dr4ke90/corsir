import { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";
import { PREDARE_DIALOG_TABLE_COLUMNS } from "./Data/handoverCreateModalTableColumns";
import { useLocation } from "react-router-dom";
import { HANDOVER_WEQ_CREATE_MODAL_TABLE_COLUMNS } from "./Data/handoverWeqCreateModalTableColumns";

const HandoverCreateModalTable = ({ dialogTableProps }) => {
  const location = useLocation();
  const { addedEquipment, handleRemoveEquipment } = dialogTableProps;

  const [rowSelection, setRowSelection] = useState("");

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (location.pathname.includes("tehnic")) {
      setColumns(HANDOVER_WEQ_CREATE_MODAL_TABLE_COLUMNS());
    } else {
      setColumns(PREDARE_DIALOG_TABLE_COLUMNS());
    }
  }, [columns, location.pathname]);

  const table = useMaterialReactTable({
    columns,
    data: addedEquipment,
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
            <IconButton onClick={() => handleRemoveEquipment(row.original.id)}>
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
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default HandoverCreateModalTable;
