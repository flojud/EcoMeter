import { Delete } from "@mui/icons-material";
import {
  GridActionsCellItem,
  GridColDef,
  GridColumnVisibilityModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import useFirebase from "../../hooks/useFirebase";
import { IMeter } from "../../interfaces/Types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOpenGasTableForm } from "../../store/slices/dialogSlice";
import { timestampToDateTimeString } from "../../utils/dateUtils";
import DataTable from "../common/DataTable";
import SlideUpFrame from "./SlideUpFrame";

const EditTableFormGas = () => {
  const { meters } = useAppSelector((state) => state.gas);
  const { openGasTableForm } = useAppSelector((state) => state.dialog);
  const { DeleteMeter } = useFirebase();
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setOpenGasTableForm(false));

  const handleDeleteClick = (item: any) => () => {
    const meter: IMeter = {
      timestamp: item.row.timestamp,
      currencyUnit: item.row.currencyUnit,
      meterValue: item.row.meterValue,
      meterType: item.row.meterType,
    };
    DeleteMeter(meter);
  };

  // states for the table
  const columns: GridColDef[] = [
    { field: "id", headerName: "id" },
    { field: "timestamp", headerName: "timestamp" },
    { field: "currencyUnit", headerName: "currencyUnit" },
    {
      field: "date",
      headerName: "Date",
      sortable: true,
      editable: true,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${timestampToDateTimeString(params.row.timestamp) || ""}`,
    },
    {
      field: "meterValue",
      headerName: "Meter",
      sortable: true,
      editable: true,
      flex: 1,
    },
    {
      field: "delete",
      type: "delete",
      headerName: "Delete",
      sortable: false,
      editable: false,
      renderCell: (item: any) => {
        return (
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(item)}
            color="inherit"
          />
        );
      },
    },
  ];

  // Hide columns status and traderName, the other columns will remain visible
  const columnVisibility: GridColumnVisibilityModel = {
    id: false,
    timestamp: false,
    currencyUnit: false,
  };

  return (
    <SlideUpFrame
      title="Edit Gas Consumptions"
      open={openGasTableForm}
      onClose={onClose}
    >
      <DataTable
        columns={columns}
        data={meters}
        columnVisibility={columnVisibility}
      />
    </SlideUpFrame>
  );
};

export default EditTableFormGas;
