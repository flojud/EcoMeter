import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import A2HSInstaller from "./components/common/A2HSInstaller";
import Notification from "./components/common/Notification";
import SplashScreen from "./components/common/splashScreen/SplashScreen";
import ActionDial from "./components/dialog/ActionDial";
import AddMeterForm from "./components/dialog/AddMeterForm";
import EditTableForm from "./components/dialog/EditTableFormGas";
import ImportMeterForm from "./components/dialog/ImportMeterForm";
import NavigationDrawer from "./components/menu/NavigationDrawer";
import { AuthContext } from "./contexts/AuthContextProvider";
import { ThemeContext } from "./contexts/ThemeContextProvider";
import useFirebase from "./hooks/useFirebase";
import { darkThemeOptions, lightThemeOptions } from "./utils/MyThemeOptions";

const App = () => {
  const themeContext = useContext(ThemeContext);
  const lightTheme = createTheme(lightThemeOptions);
  const darkTheme = createTheme(darkThemeOptions);
  const appliedTheme = createTheme(themeContext.light ? lightTheme : darkTheme);

  const authContext = useContext(AuthContext);
  const { UpdateDataIfOlderThan5Minutes } = useFirebase();

  useEffect(() => {
    // check if the user is logged in
    if (authContext !== null && authContext.loggedIn) {
      // check if the data is older than 5 minutes
      UpdateDataIfOlderThan5Minutes();
    }
  }, [authContext, UpdateDataIfOlderThan5Minutes]);

  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <SplashScreen />
        <NavigationDrawer />
        <ActionDial />
        <AddMeterForm />
        <EditTableForm />
        <ImportMeterForm />
        <A2HSInstaller />
      </ThemeProvider>
      <Notification />
    </>
  );
};

export default App;
