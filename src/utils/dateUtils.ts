import dayjs, { Dayjs } from "dayjs";

export const dateToTimestamp = (date: Dayjs | null | number): number => {
  if (typeof date === "number") {
    return date;
  } else if (dayjs.isDayjs(date)) {
    return date.unix();
  } else {
    return 0;
  }
};

export const toDayjsObject = (date: Dayjs | null | number): Dayjs | null => {
  if (typeof date === "number" && date > 0) {
    return dayjs.unix(date);
  } else if (dayjs.isDayjs(date)) {
    return date;
  } else {
    return null;
  }
};

export const timestampToDateTimeString = (timestamp: number): string => {
  const date = dayjs(timestamp * 1000);
  return date.format("YYYY-MM-DD");
};
