import { Box } from "@mui/material";
import image from "./login.jpg";
import { ZINDEX_BLURRED_PLANT } from "../../utils/zIndexes";

interface BluredPlantProps {
  children: React.ReactNode;
}
const BluredPlant = ({ children }: BluredPlantProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: ZINDEX_BLURRED_PLANT,

        backgroundImage: `url(${image})`,
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BluredPlant;
