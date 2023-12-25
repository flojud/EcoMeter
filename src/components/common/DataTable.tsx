import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useContext } from "react";
import { NotificationContext } from "../../contexts/NotificationContextProvider";
import useFirebase from "../../hooks/useFirebase";

interface DataTableProps {
  columns: GridColDef[];
  data: any;
  columnVisibility?: GridColumnVisibilityModel;
}

const DataTable = ({ columns, data, columnVisibility }: DataTableProps) => {
  const notifyContext = useContext(NotificationContext);
  const { UpdateMeter } = useFirebase();

  // DataGrid requires an id for each row, so we add it here
  let idCounter = 1;
  data = data.map((item: any) => ({
    ...item,
    id: idCounter++,
  }));

  // update record in database
  const handleEdit = (record: any) => {
    UpdateMeter(record.timestamp, record.meterValue, record.meterType);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ width: "100%", py: 4, overflow: "hidden" }}>
      {data ? (
        <DataGrid
          rows={data}
          columns={columns}
          columnVisibilityModel={columnVisibility}
          processRowUpdate={(updatedRow) => handleEdit(updatedRow)}
          onProcessRowUpdateError={(error) =>
            notifyContext.addNotification(error, "error")
          }
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          slots={{ toolbar: CustomToolbar }}
        />
      ) : (
        <Typography variant="body1">No data available</Typography>
      )}
    </Box>
  );
};
export default DataTable;
