import { Box, Card, CardContent, CardHeader, Chip } from "@mui/material";
import { ICarousleSlideBox } from "../../../interfaces/Types";

interface ItemProps {
  slide: ICarousleSlideBox;
}
const Item = ({ slide }: ItemProps) => {
  return (
    <Box
      sx={{
        flex: "0 0 75%",
        "min-width": 0,
        p: 1,
      }}
    >
      <Box>
        <Card>
          <CardHeader title={slide.title} />
          <CardContent>
            <Chip label={slide.consumption} />

            <Chip label={slide.costs} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default Item;
