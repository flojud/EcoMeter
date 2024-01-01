import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IConsumption } from "../interfaces/Types";

interface IMeter {
  meterValue: number;
  timestamp: number;
}

dayjs.extend(customParseFormat);

export const interpolateMissingDays = (
  meterArray: IMeter[]
): IConsumption[] => {
  if (meterArray.length < 2) {
    // Not enough data to fill missing days
    return meterArray as IConsumption[];
  }

  // Create a new array sorted based on timestamps
  const sortedMeterArray = [...meterArray].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const interpolatedArray: IConsumption[] = [];

  for (let i = 0; i < sortedMeterArray.length - 1; i++) {
    const currentMeter = sortedMeterArray[i];
    const nextMeter = sortedMeterArray[i + 1];

    // Calculate the difference in days between current and next timestamp
    const daysDiff = dayjs(nextMeter.timestamp, "X").diff(
      dayjs(currentMeter.timestamp, "X"),
      "day"
    );

    interpolatedArray.push({
      meterValue: currentMeter.meterValue,
      timestamp: currentMeter.timestamp,
    });

    // Linear interpolation for missing days
    if (daysDiff > 1) {
      const valueDiff = nextMeter.meterValue - currentMeter.meterValue;
      const dailyIncrement = valueDiff / daysDiff;

      for (let j = 1; j < daysDiff; j++) {
        const interpolatedTimestamp = dayjs(currentMeter.timestamp, "X")
          .add(j, "day")
          .unix();
        const inc = Math.abs(j * dailyIncrement);
        const interpolatedValue = Math.abs(
          Number(currentMeter.meterValue) + inc
        );

        interpolatedArray.push({
          meterValue: interpolatedValue,
          timestamp: interpolatedTimestamp,
        });
      }
    }
  }

  // Add the last meter reading
  interpolatedArray.push(sortedMeterArray[sortedMeterArray.length - 1]);

  // Calculate missing consumption
  return calculateMissingConsumption(interpolatedArray);
};

function calculateMissingConsumption(data: IConsumption[]): IConsumption[] {
  const result: IConsumption[] = [];

  for (let i = 0; i < data.length; i++) {
    if (!data[i].consumption) {
      const meterDifference =
        data[i].meterValue - (data[i - 1]?.meterValue || data[i].meterValue);

      const newConsumption = meterDifference;

      // Create a new object with the existing properties and the calculated consumption
      result.push({ ...data[i], consumption: newConsumption });
    } else {
      result.push(data[i]);
    }
  }

  return result;
}
