import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setBasicMonthCharge,
  setConsumption,
  setCubicMeterCharge,
  setRainwaterFee,
  setSquareMeters,
} from "../../store/slices/settings/waterSettingsSlice";

interface WaterProps {
  onUpdate: () => void;
}

const Water = ({ onUpdate }: WaterProps) => {
  const {
    squareMeters,
    consumption,
    basicMonthCharge,
    cubicMeterCharge,
    sewageCubicMeterCharge,
    rainwaterFee,
  } = useAppSelector((state) => state.settings.water);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ p: 2, pb: 8, width: "100%" }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          width="100%"
        >
          <Typography variant="h5">Consumption</Typography>
          <TextField
            fullWidth
            label="Consumption"
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">m³</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Stack>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          width="100%"
        >
          <Typography variant="h5">Contract details</Typography>
          <TextField
            fullWidth
            label="Basic price"
            type="number"
            value={basicMonthCharge}
            onChange={(e) =>
              dispatch(setBasicMonthCharge(Number(e.target.value)))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">€/month</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Working price"
            type="number"
            value={cubicMeterCharge}
            onChange={(e) =>
              dispatch(setCubicMeterCharge(Number(e.target.value)))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">€/m³</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Sewage price"
            type="number"
            value={sewageCubicMeterCharge}
            onChange={(e) =>
              dispatch(setCubicMeterCharge(Number(e.target.value)))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">€/m³</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Square meters"
            type="number"
            value={squareMeters}
            onChange={(e) => dispatch(setSquareMeters(Number(e.target.value)))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">m²</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Rainwater fee"
            type="number"
            value={rainwaterFee}
            onChange={(e) => dispatch(setRainwaterFee(Number(e.target.value)))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">€/m²</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Stack>
        <Button variant="outlined" fullWidth onClick={onUpdate}>
          update
        </Button>
      </Stack>
    </Box>
  );
};
export default Water;
