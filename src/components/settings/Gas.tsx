import { Apartment, Factory, House, Villa } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setBasicPrice,
  setCalorificValue,
  setConsumption,
  setConsumptionType,
  setContractDate,
  setRuntime,
  setWorkingPrice,
  setZNumber,
} from "../../store/slices/settings/gasSettingsSlice";
import * as References from "../../utils/consumptionReferences";

interface GasProps {
  onUpdate: () => void;
}

const Gas = ({ onUpdate }: GasProps) => {
  const {
    consumptionType,
    consumption,
    workingPrice,
    basicPrice,
    contractDate,
    runtime,
    calorificValue,
    zNumber,
  } = useAppSelector((state) => state.settings.gas);
  const dispatch = useAppDispatch();

  const handleConsumptionType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    dispatch(setConsumptionType(newAlignment));
    switch (newAlignment) {
      case "s":
        dispatch(setConsumption(References.GAS_S));
        break;
      case "m":
        dispatch(setConsumption(References.GAS_M));
        break;
      case "l":
        dispatch(setConsumption(References.GAS_L));
        break;
      case "xl":
        dispatch(setConsumption(References.GAS_XL));
        break;
      default:
        break;
    }
  };

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
          <Typography variant="body2">
            Choose the size of your household
          </Typography>
          <ToggleButtonGroup
            fullWidth
            value={consumptionType}
            exclusive
            onChange={handleConsumptionType}
          >
            <ToggleButton value="s">
              <Apartment />
            </ToggleButton>
            <ToggleButton value="m">
              <House />
            </ToggleButton>
            <ToggleButton value="l">
              <Villa />
            </ToggleButton>
            <ToggleButton value="xl">
              <Factory />
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="body2">
            — or enter your exact consumption —
          </Typography>
          <TextField
            fullWidth
            label="Consumption"
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">kWh</InputAdornment>
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
            value={basicPrice}
            onChange={(e) => dispatch(setBasicPrice(Number(e.target.value)))}
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
            value={workingPrice}
            onChange={(e) => dispatch(setWorkingPrice(Number(e.target.value)))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Cent/kWh</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={contractDate}
              onChange={(newValue) => {
                dispatch(setContractDate(newValue));
              }}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Runtime"
            type="number"
            value={runtime}
            onChange={(e) => dispatch(setRuntime(Number(e.target.value)))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">month</InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Calorific Value"
            type="number"
            value={calorificValue}
            onChange={(e) =>
              dispatch(setCalorificValue(Number(e.target.value)))
            }
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="State number"
            type="number"
            value={zNumber}
            onChange={(e) => dispatch(setZNumber(Number(e.target.value)))}
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
export default Gas;
