/* eslint-disable react-hooks/exhaustive-deps */
import { Bolt, Home, Settings, WaterDrop, Whatshot } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setItem } from "../../store/slices/menuSlice";
import NavigationRouter from "./NavigationRouter";

const NavigationDrawer = () => {
  const { item } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const authContext = useContext(AuthContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          minHeight: "90vh",
          p: 2,
          mb: 8,
        }}
      >
        <NavigationRouter />
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={item}
          onChange={(event, newValue) => {
            dispatch(setItem(newValue));
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          {authContext?.loggedIn && (
            <BottomNavigationAction label="Gas" icon={<Whatshot />} />
          )}
          {authContext?.loggedIn && (
            <BottomNavigationAction label="Electricity" icon={<Bolt />} />
          )}
          {authContext?.loggedIn && (
            <BottomNavigationAction label="Water" icon={<WaterDrop />} />
          )}
          {authContext?.loggedIn && (
            <BottomNavigationAction label="Settings" icon={<Settings />} />
          )}
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default NavigationDrawer;
