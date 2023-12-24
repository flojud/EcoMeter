import {
  GridColDef,
  GridColumnVisibilityModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOpenGasTableForm } from "../../store/slices/dialogSlice";
import { timestampToDateTimeString } from "../../utils/dateUtils";
import DataTable from "../common/DataTable";
import SlideUpFrame from "./SlideUpFrame";

const EditTableFormGas = () => {
  const { meters } = useAppSelector((state) => state.gas);

  const { openGasTableForm } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setOpenGasTableForm(false));

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
