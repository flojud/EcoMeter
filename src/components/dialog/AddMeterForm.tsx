import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import { CurrencyUnit, IMeter, MeterType } from "../../interfaces/Types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOpenMeterForm } from "../../store/slices/dialogSlice";
import SlideUpFrame from "./SlideUpFrame";

const AddMeterForm = () => {
  const { SaveMeter } = useFirebase();

  // form state
  const [date, setDate] = useState<Dayjs | null>(null);
  const [meterType, setMeterType] = useState<string>("");
  const [currencyUnit, setCurrencyUnit] = useState<string>("");
  const [meterValue, setMeterValue] = useState<number | null>(null);

  // editor state, open or closed
  const openAddMeterForm = useAppSelector(
    (state) => state.dialog.openAddMeterForm
  );
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setOpenMeterForm(false));

  // submittable and submitting state
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // on every change of the form, check if the form is submittable
  useEffect(() => {
    if (date && meterType && currencyUnit && meterValue) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
  }, [date, meterType, currencyUnit, meterValue]);

  // reset the states
  const resetStates = () => {
    setDate(null);
    setMeterType("");
    setCurrencyUnit("");
    setMeterValue(null);
  };

  // save the data to the database
  const save = () => {
    setIsSubmitting(true);

    const meter = {
      meterType: meterType as MeterType,
      currencyUnit: currencyUnit as CurrencyUnit,
      meterValue: meterValue,
      timestamp: date!.unix(),
    } as IMeter;

    SaveMeter(meter)
      .then(() => {
        setIsSubmitting(false);
        onClose();
      })
      .finally(() => {
        resetStates();
      });
  };

  const filteredCurrencyUnits = Object.values(CurrencyUnit).filter(
    (value) =>
      (meterType === MeterType.GAS && value === CurrencyUnit.M3) ||
      (meterType === MeterType.ELECTRICITY && value === CurrencyUnit.KWH) ||
      (meterType === MeterType.WATER && value === CurrencyUnit.M3)
  );

  return (
    <SlideUpFrame
      title="New Consumption Entry"
      open={openAddMeterForm}
      onClose={onClose}
    >
      <Box marginBottom={8}>
        <Stack
          direction="column"
          alignItems="flex-start"
          spacing={4}
          marginBottom={8}
        >
          <Typography variant="body2">Add new data here!</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel>Meter Type</InputLabel>
            <Select
              value={meterType}
              label="Meter Type"
              onChange={(e) => setMeterType(e.target.value as string)}
            >
              {Object.values(MeterType).map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Currency Unit</InputLabel>
            <Select
              value={currencyUnit}
              label="Currency Unit"
              onChange={(e) => setCurrencyUnit(e.target.value as string)}
            >
              {filteredCurrencyUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Meter Value"
              type="number"
              value={meterValue}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setMeterValue(Number(e.target.value))}
            />
          </FormControl>

          <LoadingButton
            disabled={!isSubmittable || isSubmitting}
            variant="contained"
            sx={{ marginTop: 2, width: "100%" }}
            size="large"
            loading={isSubmitting}
            onClick={save}
          >
            <Box component="span">Save</Box>
          </LoadingButton>
        </Stack>
      </Box>
    </SlideUpFrame>
  );
};

export default AddMeterForm;
