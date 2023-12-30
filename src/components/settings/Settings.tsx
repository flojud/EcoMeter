import { Bolt, WaterDrop, Whatshot } from "@mui/icons-material";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import { useAppSelector } from "../../store/hooks";
import { dateToTimestamp } from "../../utils/dateUtils";
import Electricity from "./Electricity";
import Gas from "./Gas";
import Water from "./Water";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const settings = useAppSelector((state) => state.settings);
  const { SaveSettings } = useFirebase();

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setActiveTab(newValue);

  const updateSettings = () => {
    const gas = {
      basicPrice: settings.gas.basicPrice,
      consumption: settings.gas.consumption,
      consumptionType: settings.gas.consumptionType,
      contractDate: dateToTimestamp(settings.gas.contractDate),
      runtime: settings.gas.runtime,
      workingPrice: settings.gas.workingPrice,
      zNumber: settings.gas.zNumber,
      calorificValue: settings.gas.calorificValue,
    };

    const electricity = {
      basicPrice: settings.electricity.basicPrice,
      consumption: settings.electricity.consumption,
      consumptionType: settings.electricity.consumptionType,
      contractDate: dateToTimestamp(settings.electricity.contractDate),
      runtime: settings.electricity.runtime,
      workingPrice: settings.electricity.workingPrice,
    };

    const water = {
      basicMonthCharge: settings.water.basicMonthCharge,
      consumption: settings.water.consumption,
      cubicMeterCharge: settings.water.cubicMeterCharge,
      rainwaterFee: settings.water.rainwaterFee,
      sewageCubicMeterCharge: settings.water.sewageCubicMeterCharge,
      squareMeters: settings.water.squareMeters,
    };

    const settingsData = {
      gas: gas,
      electricity: electricity,
      water: water,
    };

    SaveSettings(settingsData);
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Typography variant="h2">Settings</Typography>
      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab icon={<Whatshot />} label="Gas" />
        <Tab icon={<Bolt />} label="Electricity" />
        <Tab icon={<WaterDrop />} label="Water" />
      </Tabs>
      {activeTab === 0 && <Gas onUpdate={updateSettings} />}
      {activeTab === 1 && <Electricity onUpdate={updateSettings} />}
      {activeTab === 2 && <Water onUpdate={updateSettings} />}
    </Stack>
  );
};
export default Settings;
