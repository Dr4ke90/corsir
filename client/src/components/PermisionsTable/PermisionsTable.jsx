import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip, Checkbox, Button } from "@mui/material";
import { MODULES } from "../../data/modules";

const PermisionsTable = ({ modules, setUserModuleUpdates }) => {
  const [modulesList, setModulesList] = useState([]);

  const [newModule, setNewModule] = useState({
    name: "",
    permisions: {
      create: false,
      update: false,
      delete: false,
    },
  });

  useEffect(() => {
    if (modules) {
      setModulesList(modules);
    } else {
      setModulesList([]);
    }
  }, [modules]);

  useEffect(() => {
    setUserModuleUpdates(modulesList);
  }, [modulesList, setUserModuleUpdates]);

  const handlePermisionChange = (e, row) => {
    setModulesList((prev) => {
      const index = prev.findIndex((modul) => modul.name === row.original.name);

      const updatedModule = {
        ...prev[index],
        permisions: {
          ...prev[index].permisions,
          [e.target.name]: e.target.checked,
        },
      };

      const updatedModulesList = [...prev];
      updatedModulesList[index] = updatedModule;

      return updatedModulesList;
    });
  };

  const handleAddModule = ({ table }) => {
    setModulesList((prev) => {
      return [...prev, newModule];
    });

    table.setCreatingRow(null);
  };

  const handleDeleteModule = (row) => {
    if (row) {
      setModulesList((prev) => {
        return prev.filter((modul) => modul.name !== row.name);
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "name",
        header: "Modul",
        accessorFn: (row) =>
          `${row.name.slice(0, 1).toUpperCase() + row.name.slice(1)}`,
        size: 130,
        grow: true,
        enableEditing: true,
        editSelectOptions: MODULES.filter((module) => {
          return !modulesList.some((m) => m.name === module.name);
        }).map(
          (module) =>
            module.name.slice(0, 1).toUpperCase() + module.name.slice(1)
        ),
        muiEditTextFieldProps: ({ row }) => {
          return {
            select: true,
            onChange: (e) =>
              setNewModule((prev) => {
                return {
                  ...prev,
                  name: e.target.value.toLowerCase(),
                };
              }),
          };
        },
      },

      {
        id: "create",
        header: "Create",
        size: 60,
        grow: false,
        enableEditing: true,
        muiEditTextFieldProps: ({ cell }) => {
          return {
            name: "create",
            type: "checkbox",
            checked: newModule.create,
            onChange: (e) =>
              setNewModule((prev) => {
                return {
                  ...prev,
                  permisions: {
                    ...prev.permisions,
                    [e.target.name]: e.target.checked,
                  },
                };
              }),
          };
        },
        Cell: ({ cell, row }) => {
          return (
            <Checkbox
              size="small"
              name="create"
              checked={
                row.original.permisions ? row.original.permisions.create : false
              }
              onChange={(e) => handlePermisionChange(e, row)}
            />
          );
        },
      },
      {
        id: "update",
        header: "Update",
        size: 60,
        grow: true,
        enableEditing: true,
        muiEditTextFieldProps: ({ cell }) => {
          return {
            name: "update",
            type: "checkbox",
            checked: newModule.update,
            onChange: (e) =>
              setNewModule((prev) => {
                return {
                  ...prev,
                  permisions: {
                    ...prev.permisions,
                    [e.target.name]: e.target.checked,
                  },
                };
              }),
          };
        },
        Cell: ({ cell, row }) => {
          return (
            <Checkbox
              size="small"
              name="update"
              checked={
                row.original.permisions ? row.original.permisions.update : false
              }
              onChange={(e) => handlePermisionChange(e, row)}
            />
          );
        },
      },
      {
        id: "delete",
        header: "Delete",
        size: 60,
        grow: true,
        enableEditing: true,
        muiEditTextFieldProps: ({ cell }) => {
          return {
            name: "delete",
            type: "checkbox",
            checked: newModule.delete,
            onChange: (e) =>
              setNewModule((prev) => {
                return {
                  ...prev,
                  permisions: {
                    ...prev.permisions,
                    [e.target.name]: e.target.checked,
                  },
                };
              }),
          };
        },
        Cell: ({ cell, row }) => {
          return (
            <Checkbox
              size="small"
              name="delete"
              checked={
                row.original.permisions ? row.original.permisions.delete : false
              }
              onChange={(e) => handlePermisionChange(e, row)}
            />
          );
        },
      },
    ],
    [newModule.create, newModule.update, newModule.delete, modulesList]
  );

  const table = useMaterialReactTable({
    columns,
    data: modulesList,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableFilters: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableEditing: true,
    editDisplayMode: "row",
    createDisplayMode: "row",
    enableStickyHeader: true,
    initialState: { density: "compact", expanded: false },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: "pointer",
      },
    }),
    enableRowActions: true,
    renderRowActions: ({ row, table }) => {
      return (
        <Box sx={{ display: "flex", gap: "0.1rem" }}>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteModule(row.original)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
    muiTablePaperProps: {
      sx: {
        width: "100%",
        height: "auto",
        overflow: "auto",
      },
    },

    enableTopToolbar: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Adauga modul
      </Button>
    ),

    onCreatingRowSave: handleAddModule,
  });

  return <MaterialReactTable table={table} />;
};

export default PermisionsTable;
