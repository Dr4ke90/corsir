import { useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";
import { WORK_EQUIPMENT_ADD_MODAL_TABLE_COLUMNS } from "./Data/workEquipmentAddModalTableColumns";

const WorkEquipmentAddModalTable = ({ data, dialogTableProps }) => {
  const [rowSelection, setRowSelection] = useState("");

  const { handleRemoveItem } = dialogTableProps;

  const table = useMaterialReactTable({
    columns: WORK_EQUIPMENT_ADD_MODAL_TABLE_COLUMNS(),
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
            <IconButton onClick={() => handleRemoveItem(row)}>
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

export default WorkEquipmentAddModalTable;
