/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddToHomescreenPrompt } from "../../hooks/useAddToHomescreenPrompt";

const A2HSInstaller = () => {
  const [open, setOpen] = useState(false);
  const [prompt, promptToInstall, isInstalled] = useAddToHomescreenPrompt();

  useEffect(() => {
    if (prompt && !isInstalled) setOpen(true);
    if (isInstalled) setOpen(false);
  }, [prompt]);

  const installA2HS = () => {
    promptToInstall();
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            width: "100%",
            bgcolor: "text.primary",
            p: 2,
          }}
        >
          <Typography variant="h3" color="white" gutterBottom>
            Activity-Tracker
          </Typography>
          <Typography variant="body1" color="white" gutterBottom>
            Make it part of your daily routine - add it to your homescreen and
            access it with just one tap!
          </Typography>
          <Button
            variant="contained"
            onClick={installA2HS}
            sx={{ mt: 2, mb: 2 }}
          >
            Install App
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default A2HSInstaller;
