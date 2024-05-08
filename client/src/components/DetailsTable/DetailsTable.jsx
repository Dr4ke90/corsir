import { useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useLocation } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { formatDate } from "../../utils/formatDate";

const DetailsTable = ({
  data,
  columns,
  locatii,
  handleUpdateEquipment,
  handleCloseInventory,
  file,
  dbEquipmentList,
}) => {
  const [rowSelection, setRowSelection] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 15,
  });

  const [equipmentList, setEquipmentList] = useState([]);

  const [stare, setStare] = useState(null);

  const [onCreateMode, setOnCreateMode] = useState(false);


  useEffect(() => {
    if (file) {
      setStare(file.stare);
    } else {
      setStare(null);
    }
  }, [file]);

  useEffect(() => {
    let filteredEquipment;
    if (stare && stare === "Deschis") {
      filteredEquipment = data.filter(
        (item) => item.inventar < formatDate(new Date())
      );
      setEquipmentList(filteredEquipment);
    } else {
      setEquipmentList(data);
    }
  }, [data, stare]);

  const location = useLocation();

  
  const handleCreateUser = async ({ values, table }) => {
    const findedEquipment = dbEquipmentList.find(
      (item) => item.cit === values.cit
    );

    if (findedEquipment) {
      setEquipmentList((prev) => {
        return [findedEquipment, ...prev]; 
      });
    } else {
      return;
    }

    table.setCreatingRow(null); //exit creating mode
  };

  const table = useMaterialReactTable({
    columns: columns(locatii, onCreateMode),
    data: equipmentList,
    enablePagination: true,
    onPaginationChange: setPagination,
    enableSorting: false,
    enableDensityToggle: false,
    enableFilters: true,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableGlobalFilter: true,
    enableEditing: stare && stare === "Deschis" ? true : false,
    editDisplayMode: "row",
    createDisplayMode: "row",
    enableRowSelection: false,
    positionToolbarAlertBanner: "none",
    initialState: { density: "compact", expanded: false },
    state: { pagination, rowSelection },
    onEditingRowSave: handleUpdateEquipment,
    onCreatingRowSave: handleCreateUser,
    columnFilterDisplayMode: "popover",
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
    getRowId: (row) => row.id,
    muiTablePaperProps: {
      sx: {
        width: "100%",
        overflow: "auto",
      },
    },
    enableStickyFooter: true,
    enableStickyHeader: true,
    enableTopToolbar: stare && stare === "Deschis" ? true : false,
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          setOnCreateMode(true);
          table.setCreatingRow(true);
        }}
      >
        Adauga echipament
      </Button>
    ),
    enableRowActions: stare && stare === "Deschis" ? true : false,

    enableBottomToolbar: stare && stare === "Deschis" ? true : false,
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleCloseInventory}
        >
          Inchide inventar
        </Button>
      </Box>
    ),
    muiTableContainerProps: {
      sx: {
        height: stare && stare === "Deschis" ? "67%" : "100%",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default DetailsTable;
