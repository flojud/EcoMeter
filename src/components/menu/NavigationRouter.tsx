import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useAppSelector } from "../../store/hooks";
import Electricity from "../pages/Electricity";
import Gas from "../pages/Gas";
import Login from "../pages/Login";
import Water from "../pages/Water";
import Settings from "../settings/Settings";

const NavigationRouter = () => {
  const authContext = useContext(AuthContext);
  const { item } = useAppSelector((state) => state.menu);

  if (authContext?.loggedIn === false) return <Login />;

  switch (item) {
    case 0:
      return <Gas />;
    case 1:
      return <Electricity />;
    case 2:
      return <Water />;
    case 3:
      return <Settings />;
    default:
      return <>123</>;
  }
};
export default NavigationRouter;
