import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import { ICarousleSlideBox } from "../../../interfaces/Types";

interface ItemProps {
  slide: ICarousleSlideBox;
}
const Item = ({ slide }: ItemProps) => {
  return (
    <Box
      sx={{
        flex: "0 0 55%",
        "min-width": 0,
        p: 1,
      }}
    >
      <Box>
        <Card>
          <CardHeader title={slide.title} />
          <CardContent>
            <Typography
              variant="caption"
              color="text.disabled"
              gutterBottom
              paragraph
            >
              Total {slide.totalConsumption}
            </Typography>
            <Chip
              label={`⌀ ${slide.consumption}`}
              sx={{ mr: 1 }}
              variant="outlined"
              color="primary"
            />
            <Chip label={slide.costs} variant="outlined" color="secondary" />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default Item;
