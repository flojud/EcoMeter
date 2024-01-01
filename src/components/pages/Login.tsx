import GoogleIcon from "@mui/icons-material/Google";
import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import BluredPlant from "../common/BluredPlant";

const Login = () => {
  const authContext = useContext(AuthContext);

  return (
    <BluredPlant>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        height="100%"
        width="100%"
        py={24}
      >
        <Stack justifyContent="center" alignItems="center">
          <Typography
            variant="h2"
            color={(theme) => theme.palette.text.primary}
            sx={(theme) => ({
              textShadow: `1px 1px 1px ${theme.palette.text.secondary}`,
            })}
          >
            EcoMeter
          </Typography>
          <Typography
            variant="body1"
            color={(theme) => theme.palette.text.secondary}
          >
            Deine grüne Energie-App!
          </Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={authContext!.authMethods.googleSignIn}
          startIcon={<GoogleIcon />}
        >
          Über Google anmelden
        </Button>
      </Stack>
    </BluredPlant>
  );
};
export default Login;
