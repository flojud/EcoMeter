import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useContext } from "react";
import A2HSInstaller from "./components/common/A2HSInstaller";
import Notification from "./components/common/Notification";
import ActionDial from "./components/dialog/ActionDial";
import AddMeterForm from "./components/dialog/AddMeterForm";
import EditTableForm from "./components/dialog/EditTableFormGas";
import NavigationDrawer from "./components/menu/NavigationDrawer";
import { ThemeContext } from "./contexts/ThemeContextProvider";
import { darkThemeOptions, lightThemeOptions } from "./utils/MyThemeOptions";

const App = () => {
  const themeContext = useContext(ThemeContext);
  const lightTheme = createTheme(lightThemeOptions);
  const darkTheme = createTheme(darkThemeOptions);
  const appliedTheme = createTheme(themeContext.light ? lightTheme : darkTheme);

  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <NavigationDrawer />
        <ActionDial />
        <AddMeterForm />
        <EditTableForm />
        <A2HSInstaller />
      </ThemeProvider>
      <Notification />
    </>
  );
};

export default App;
