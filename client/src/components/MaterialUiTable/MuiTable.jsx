import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ReadMore } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PreviewIcon from "@mui/icons-material/Preview";
import { useLocation } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const MuiTable = ({ props }) => {
  const {
    columns,
    data,
    handleUpdate,
    handleExportAll,
    handleExportRows,
    handleOpenCreateModal,
    handleDelete,
    handleOpenModalDetalii,
    setIsOnEditMode,
  } = props;

  const [rowSelection, setRowSelection] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 15,
  });

  const location = useLocation();
  const loggedUser = useSelector((state) => state.users.loggedUser);
  const [permisions, setPermisions] = useState({});

  useEffect(() => {
    let curentModul;

    if (loggedUser.module) {
      curentModul = loggedUser.module.find((modul) =>
        location.pathname.includes(modul.name)
      );
    } else {
      curentModul = null;
    }

    if (curentModul) {
      setPermisions(curentModul.permisions);
    } else {
      setPermisions({});
    }
  }, [location.pathname, loggedUser]);

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "modal",
    editDisplayMode: location.pathname.includes("angajati") ? "modal" : "row",
    enableEditing: true,
    getRowId: (row) => row.id,
    initialState: {
      density: "compact",
      expanded: false,
      showGlobalFilter: true,
    },
    enableDensityToggle: false,
    columnFilterDisplayMode: "popover",
    enableHiding: false,
    enableRowSelection: true,
    showGlobalFilter: true,
    positionToolbarAlertBanner: "none",
    onPaginationChange: setPagination,
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
    onRowSelectionChange: setRowSelection,
    state: { pagination, rowSelection },
    enableRowNumbers: true,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "0.1rem", justifyContent: "center" }}>
        {row.original.stare !== "Inchis" && (
          <Tooltip
            title={
              permisions.update || loggedUser.superuser
                ? "Edit"
                : "Fara permisiuni"
            }
          >
            <span>
              <IconButton
                onClick={
                  !location.pathname.includes("angajati")
                    ? () => table.setEditingRow(row)
                    : () => {
                        handleOpenCreateModal(row);
                        setIsOnEditMode(true);
                      }
                }
                disabled={!permisions.update && !loggedUser.superuser}
              >
                <EditIcon
                  color={
                    permisions.update || loggedUser.superuser
                      ? "secondary"
                      : "disabled"
                  }
                />
              </IconButton>
            </span>
          </Tooltip>
        )}

        <Tooltip
          title={
            permisions.delete || loggedUser.superuser
              ? "Delete"
              : "Fara permisiuni"
          }
        >
          <span>
            <IconButton
              onClick={() => {
                handleDelete(row.original);
              }}
              disabled={!permisions.delete && !loggedUser.superuser}
            >
              <DeleteIcon
                color={
                  permisions.delete || loggedUser.superuser
                    ? "error"
                    : "disabled"
                }
              />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="More">
          <IconButton onClick={() => handleOpenModalDetalii(row)}>
            <ReadMore color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Tooltip
          title={
            location.pathname.includes("echip")
              ? permisions.create || loggedUser.superuser
                ? "Adauga Echipament"
                : "Fara permisiuni"
              : permisions.create || loggedUser.superuser
              ? "Creaza Fisa"
              : "Fara permisiuni"
          }
        >
          <span>
            <IconButton
              onClick={() => {
                handleOpenCreateModal();
              }}
              disabled={!permisions.create && !loggedUser.superuser}
            >
              <ControlPointIcon
                color={
                  permisions.create || loggedUser.superuser
                    ? "primary"
                    : "disabled"
                }
                sx={{ fontSize: 40 }}
              />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Preview Fisa">
          <span>
            <IconButton disabled={true}>
              <PreviewIcon color={"disabled"} sx={{ fontSize: 40 }} />
            </IconButton>
          </span>
        </Tooltip>

        {location.pathname.includes("echip") && (
          <Box>
            <Tooltip title="Exporta tot">
              <IconButton onClick={handleExportAll}>
                <FileDownloadIcon color="primary" sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Exporta selectia">
              <span>
                <IconButton
                  onClick={() =>
                    handleExportRows(table.getSelectedRowModel().rows)
                  }
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                >
                  <FactCheckIcon
                    color={
                      table.getIsSomeRowsSelected() ||
                      table.getIsAllRowsSelected()
                        ? "primary"
                        : "disabled"
                    }
                    sx={{ fontSize: 40 }}
                  />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
      </Box>
    ),
    muiTableContainerProps: {
      sx: {
        height: "70vh",
        width: "90vw",
      },
    },
    enableFullScreenToggle: false,
    enableStickyHeader: true,

    filterFromLeafRows: true,
    paginateExpandedRows: false,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        size: 30,
        grow: false,
      },
      "mrt-row-numbers": {
        size: 5,
        grow: true,
      },
      "mrt-row-select": {
        size: 0,
      },
    },
    onEditingRowSave: handleUpdate,
  });

  return <MaterialReactTable table={table} />;
};

export default MuiTable;
