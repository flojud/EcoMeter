import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext !== null && authContext.loggedIn ? (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Typography>Logged in as {authContext.user?.displayName}</Typography>
        </Stack>
      ) : (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Typography>Not Logged in home page</Typography>
          <Button
            variant="contained"
            onClick={authContext!.authMethods.googleSignIn}
          >
            Login
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Home;
