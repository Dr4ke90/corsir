import { useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";
import { RETURN_CREATE_MODAL_TABELE_COLUMNS } from "./Data/returnCreateModalTableColumns";
import { RETURN_WEQ_CREATE_MODAL_TABLE_COLUMNS } from "./Data/returnWeqCreateModalTableColumns";
import { useLocation } from "react-router-dom";

const ReturDialogTable = ({ data }) => {
  const { addedEquipment, handleRemoveEquipment } = data;

  const [rowSelection, setRowSelection] = useState("");

  const location = useLocation();

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (location.pathname.includes("tehnic")) {
      setColumns(RETURN_WEQ_CREATE_MODAL_TABLE_COLUMNS());
    } else {
      setColumns(RETURN_CREATE_MODAL_TABELE_COLUMNS());
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
        grow: false,
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

export default ReturDialogTable;
