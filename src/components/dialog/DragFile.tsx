import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { formatFileSize, useCSVReader } from "react-papaparse";

interface DragFileProps {
  handleFileUpload: (results: any) => void;
}

const DragFile = ({ handleFileUpload }: DragFileProps) => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <CSVReader
        onUploadAccepted={(results: any) => {
          handleFileUpload(results);
          setZoneHover(false);
        }}
        onDragOver={(event: DragEvent) => {
          event.preventDefault();
          setZoneHover(true);
        }}
        onDragLeave={(event: DragEvent) => {
          event.preventDefault();
          setZoneHover(false);
        }}
        noDrag
      >
        {({ getRootProps, acceptedFile, ProgressBar }: any) => (
          <Box {...getRootProps()} style={Object.assign({}, zoneHover)}>
            {acceptedFile ? (
              <Paper sx={{ py: 2 }} elevation={24}>
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <Typography variant="body2">
                    Name: {acceptedFile.name} (
                    {formatFileSize(acceptedFile.size)})
                  </Typography>
                  <ProgressBar />
                </Stack>
              </Paper>
            ) : (
              <Button fullWidth variant="contained">
                Click to upload
              </Button>
            )}
          </Box>
        )}
      </CSVReader>
    </Box>
  );
};
export default DragFile;
