/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { IWindow } from "../../interfaces/Types";
import SlideUpFrame from "../dialog/SlideUpFrame";
declare let window: IWindow;

const A2HSInstaller = () => {
  const [open, setOpen] = useState<boolean>(false);

  const isPwa = useMediaQuery("all and (display-mode: standalone)");

  useEffect(() => {
    if (!isPwa && window.supportsPwa && window.deferredPWA !== undefined) {
      setTimeout(() => {
        setOpen(true);
      }, 2500);
    }
  }, [isPwa, window.supportsPwa]);

  useEffect(() => {
    window.addEventListener("appinstalled", () => {
      setOpen(false);
    });
  }, []);

  const handleClickInstall = () => {
    if (window.deferredPWA) {
      window.deferredPWA!.prompt();
    }
  };

  return (
    <SlideUpFrame title="EcoMeter" open={open} onClose={() => setOpen(false)}>
      <Box mt={4}>
        <Typography variant="body1" color="white" gutterBottom>
          Make it part of your daily routine - add it to your homescreen and
          access it with just one tap!
        </Typography>
        <Button
          variant="contained"
          onClick={handleClickInstall}
          sx={{ mt: 2, mb: 2 }}
        >
          Install App
        </Button>
      </Box>
    </SlideUpFrame>
  );
};

export default A2HSInstaller;
