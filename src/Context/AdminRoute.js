import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/useContext'; // Adjust if needed

const AdminRoute = ({ element }) => {
  const { currentUser, loadingUser} = useContext(UserContext);

  if (loadingUser) {
    return <div>Loading...</div>; // finally ffffix!
  }
  if (!currentUser) {
    return <Navigate to="/" />; //have to write this....
  }
  if (!currentUser.admin_user) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default AdminRoute;
