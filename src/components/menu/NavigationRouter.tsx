import { useAppSelector } from "../../store/hooks";
import Gas from "../pages/Gas";
import Home from "../pages/Home";
import Settings from "../settings/Settings";

const NavigationRouter = () => {
  const { item } = useAppSelector((state) => state.menu);

  switch (item) {
    case 0:
      return <Home />;
    case 1:
      return <Gas />;
    case 2:
      return <>Electricity</>;
    case 3:
      return <>Water</>;
    case 4:
      return <Settings />;
    default:
      return <>123</>;
  }
};
export default NavigationRouter;
