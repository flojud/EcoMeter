import dayjs from "dayjs";
import { isCurrencyUnit, isMeterType } from "./enumCheck";

export const dataIsValid = (data: any): boolean => {
  // check if the data is an array and has at least one row
  if (data && data.length > 1) {
    // check if the first row is the header and has the correct columns
    if (
      data[0][0].toLowerCase() === "date" &&
      data[0][1].toLowerCase() === "metervalue" &&
      data[0][2].toLowerCase() === "metertype" &&
      data[0][3].toLowerCase() === "currencyunit"
    ) {
      // drop the first row header csv file
      data.shift();

      // check each row of the data file
      data.forEach((row: any, index: number) => {
        if (row.length !== 4) {
          return false;
        }
        if (
          dayjs(row[0]).isValid() &&
          typeof Number(row[1]) === "number" &&
          isMeterType(row[2]) &&
          isCurrencyUnit(row[3])
        ) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
  return true;
};
