import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import useFirebase from "../../hooks/useFirebase";
import useNotification from "../../hooks/useNotification";
import { CurrencyUnit, IMeter, MeterType } from "../../interfaces/Types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOpenImportMeterForm } from "../../store/slices/dialogSlice";
import { dataIsValid } from "../../utils/dataIsValid";
import DragFile from "./DragFile";
import SlideUpFrame from "./SlideUpFrame";

const ImportMeterForm = () => {
  const { openImportMeterForm } = useAppSelector((state) => state.dialog);
  const dispatch = useAppDispatch();
  const { notifyContext } = useNotification();
  const { SaveMeter } = useFirebase();

  const onClose = () => dispatch(setOpenImportMeterForm(false));

  const handleFileUpload = (result: any) => {
    const { data, error } = result;

    if (error) {
      notifyContext.addNotification(
        `upload failed, please check your file, ${data}`,
        "error"
      );
      return;
    }

    if (dataIsValid(data)) {
      // eslint-disable-next-line array-callback-return
      const meters: IMeter[] = data.map((row: any) => {
        if (dayjs(row[0]).isValid()) {
          return {
            timestamp: dayjs(row[0]).unix(),
            meterValue: Number(row[1]),
            meterType: row[2] as MeterType,
            currencyUnit: row[3] as CurrencyUnit,
          };
        }
      });

      // save the meters to the database
      meters.forEach((meter) => {
        if (meter) SaveMeter(meter);
      });

      // close the form
      onClose();
    } else {
      notifyContext.addNotification(
        `upload failed, please check your file, ${data}`,
        "error"
      );
    }
  };

  return (
    <SlideUpFrame
      title="Import Meters"
      open={openImportMeterForm}
      onClose={onClose}
    >
      <Stack
        direction="column"
        alignItems="flex-start"
        spacing={2}
        width="100%"
        pt={4}
      >
        <Typography variant="body2">
          You can upload your meter data from a CSV file here! Data with the
          exact same date, that is already in the database, will be ovewritten.
        </Typography>

        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Example</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing={0}
              width="100%"
            >
              <Typography variant="caption">
                Here's a simple example:
              </Typography>
              <Typography variant="caption">
                date,meterValue,meterType,currencyUnit
              </Typography>
              <Typography variant="caption">
                2023-11-13 00:00:00,39,gas,m3
              </Typography>
              <Typography variant="caption">
                2023-10-04 00:00:00,17,gas,m3
              </Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Meter Types</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing={0}
              width="100%"
            >
              <Typography variant="caption">Allowed values are:</Typography>
              <Typography variant="caption">{MeterType.GAS}</Typography>
              <Typography variant="caption">{MeterType.ELECTRICITY}</Typography>
              <Typography variant="caption">{MeterType.WATER}</Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Currency Unit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing={0}
              width="100%"
            >
              <Typography variant="caption">Allowed values are:</Typography>
              <Typography variant="caption">{CurrencyUnit.M3}</Typography>
              <Typography variant="caption">{CurrencyUnit.KWH}</Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>

        <DragFile handleFileUpload={handleFileUpload} />
      </Stack>
    </SlideUpFrame>
  );
};

export default ImportMeterForm;
