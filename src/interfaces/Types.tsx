import { AlertColor } from "@mui/material";
import { Dayjs } from "dayjs";
import { User } from "firebase/auth";
import { ReactNode } from "react";

export type Props = { children: ReactNode | any };

export interface INotificationContext {
  notification: INotification | null;
  addNotification: (message: string, severity: AlertColor) => void;
  removeNotification: () => void;
}

export interface INotification {
  message: string | null;
  severity: AlertColor | null;
}

export interface IUserContext {
  user: User | null;
  loggedIn: boolean | null;
  authMethods: IAuthMethods;
}

export interface IAuthMethods {
  logout: () => void;
  googleSignIn: () => void;
  deleteMyUser: () => void;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: IBeforeInstallPromptEvent;
  }
}

export interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export enum MeterType {
  GAS = "gas",
  ELECTRICITY = "electricity",
  WATER = "water",
  HEAT = "heat",
  OTHER = "other",
}

export enum CurrencyUnit {
  EUR = "eur",
  KWH = "kwh",
  M3 = "m3",
  OTHER = "other",
}

export interface IMeter {
  meterType?: MeterType;
  meterValue: number;
  currencyUnit?: CurrencyUnit;
  timestamp: number;
}

export interface IConsumption {
  timestamp: number;
  meterValue: number;
  consumption?: number;
}

export interface IGasSettingsState {
  consumptionType: string;
  consumption: number;
  workingPrice: number;
  basicPrice: number;
  contractDate: Dayjs | number | null;
  runtime: number;
}

export interface IElectricySettingsState {
  consumptionType: string;
  consumption: number;
  workingPrice: number;
  basicPrice: number;
  contractDate: Dayjs | number | null;
  runtime: number;
}

export interface IWaterSettingsState {
  squareMeters: number;
  consumption: number;
  basicMonthCharge: number;
  cubicMeterCharge: number;
  sewageCubicMeterCharge: number;
  rainwaterFee: number;
}

export interface ISettings {
  gas: IGasSettingsState;
  electricity: IElectricySettingsState;
  water: IWaterSettingsState;
}
