import { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { DIALOG_TABLE_COLUMNS } from "./inventarDatas";
import { fetchEchipament } from "../../redux/slices/echipSlice";
import { useDispatch, useSelector } from "react-redux";

const InventarDialogTable = ({ dialogTableProps }) => {
  const { data } = dialogTableProps;

  const dispatch = useDispatch();

  const dbEquipmentList = useSelector((state) => state.echipament);

  const [findedEquipment, setFindedEquipment] = useState([]);

  useEffect(() => {
    dispatch(fetchEchipament());
  }, [dispatch]);

  useEffect(() => {
    const updatedList = dbEquipmentList.filter((item) => {
      return data.some((cit) => cit === item.cit);
    });
    if (data.length !== 0) {
      setFindedEquipment(updatedList);
    } else {
      setFindedEquipment([]);
    }
  }, [data, dbEquipmentList]);

  const [rowSelection, setRowSelection] = useState("");

  const table = useMaterialReactTable({
    data: findedEquipment,
    columns: DIALOG_TABLE_COLUMNS(),
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
    enableStickyHeader: true,
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

export default InventarDialogTable;
