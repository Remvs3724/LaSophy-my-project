import { UserProvider} from "./useContext";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default ProtectedLayout;