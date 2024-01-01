import { Player } from "@lottiefiles/react-lottie-player";
import { Stack, Typography } from "@mui/material";
import animationData from "./nodata.json";

const NoData = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Player
        src={animationData}
        className="player"
        autoplay
        loop
        speed={0.25}
      />
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography variant="h5">No Data available</Typography>
        <Typography variant="caption">Add your first meter</Typography>
      </Stack>
    </Stack>
  );
};
export default NoData;
