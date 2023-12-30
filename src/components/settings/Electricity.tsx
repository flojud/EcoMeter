import { FamilyRestroom, Groups, People, Person } from "@mui/icons-material";
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
  setConsumption,
  setConsumptionType,
  setContractDate,
  setRuntime,
  setWorkingPrice,
} from "../../store/slices/settings/electricitySettingsSlice";
import * as References from "../../utils/consumptionReferences";

interface ElectricityProps {
  onUpdate: () => void;
}

const Electricity = ({ onUpdate }: ElectricityProps) => {
  const {
    consumptionType,
    consumption,
    workingPrice,
    basicPrice,
    contractDate,
    runtime,
  } = useAppSelector((state) => state.settings.electricity);
  const dispatch = useAppDispatch();

  const handleConsumptionType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    dispatch(setConsumptionType(newAlignment));
    switch (newAlignment) {
      case "single":
        dispatch(setConsumption(References.ELECTRICITY_SINGLE));
        break;
      case "couple":
        dispatch(setConsumption(References.ELECTRICITY_COUPLE));
        break;
      case "smallFamily":
        dispatch(setConsumption(References.ELECTRICITY_SMALLFAMILY));
        break;
      case "largeFamily":
        dispatch(setConsumption(References.ELECTRICITY_LARGEFAMILY));
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
            Select the number of people in the household
          </Typography>
          <ToggleButtonGroup
            fullWidth
            value={consumptionType}
            exclusive
            onChange={handleConsumptionType}
          >
            <ToggleButton value="single">
              <Person />
            </ToggleButton>
            <ToggleButton value="couple">
              <People />
            </ToggleButton>
            <ToggleButton value="smallFamily">
              <Groups />
            </ToggleButton>
            <ToggleButton value="largeFamily">
              <FamilyRestroom />
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
        </Stack>
        <Button variant="outlined" fullWidth onClick={onUpdate}>
          update
        </Button>
      </Stack>
    </Box>
  );
};
export default Electricity;
