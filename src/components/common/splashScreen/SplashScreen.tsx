import { Player } from "@lottiefiles/react-lottie-player";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAnimation } from "../../../store/slices/appSlice";
import BluredPlant from "../BluredPlant";
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
        <BluredPlant>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Player src={animationData} className="player" autoplay speed={2} />
          </Box>
        </BluredPlant>
      ) : (
        <></>
      )}
    </>
  );
};

export default SplashScreen;
