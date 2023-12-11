import { Button, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import useFirebase from "../../hooks/useFirebase";

const Home = () => {
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
