import { Player } from "@lottiefiles/react-lottie-player";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAnimation } from "../../../store/slices/appSlice";
import animationData from "./animation.json";

const SplashScreen = () => {
  const { animation } = useAppSelector((state) => state.app);
  const [show, setShow] = useState<Boolean>(animation);
  const dispatch = useAppDispatch();

  // Show splash screen animation
  useEffect(() => {
    dispatch(setAnimation(true));
    const timer = setTimeout(() => {
      dispatch(setAnimation(false));
    }, 4 * 1000); // Set the time in milliseconds (e.g., 10000 for 10 seconds)

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(animation);
    }, 500); // Set the time in milliseconds (e.g., 10000 for 10 seconds)

    return () => {
      clearTimeout(timer);
    };
  }, [animation]);

  return (
    <>
      {show ? (
        <Box
          sx={(theme) => ({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.background.paper, // Adjust the background color and opacity as needed
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: animation ? 1 : 0,
            transition: "opacity 1s ease-in-out", // Add a transition for opacity
          })}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            <Typography variant="h3" sx={{ color: "white" }}>
              EcoMeter
            </Typography>
            <Player src={animationData} className="player" autoplay speed={2} />
          </Stack>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default SplashScreen;
