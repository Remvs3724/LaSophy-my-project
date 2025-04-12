import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import ReaderComments from "./ReaderComments";
import UserContent from "./UserProfile";
import SettingsContent from "./SettingContent";
import DashboardContent from "./DashboardContent";
import PopupWindow from "./ProfilePopup";
import { UserProvider } from "./Context/useContext";
import CollectBooks from "./UserProfileContent";
import RecommendBooks from "./RecommendBooks";
import EditRecommendPanel from "./EditRecommendPanel";
import DashboardTheme from "./DashboardTheme";
import UploadContent from "./UploadContent";
import Statistics from "./StatisticsPanel";
import AdminRoute from "./Context/AdminRoute";
import Unauthorized from "./Context/Unauthorized";
import FindBack from "./FindbackPassword";
import DashboardMap from "./DashboardContentMaps";
import 'bootstrap/dist/css/bootstrap.min.css';
const  App=()=>{
  return (
    <Router>
      <UserProvider>
      <AppRoutes />
      </UserProvider>
    </Router>
  );
}


const AppRoutes=()=>{
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;
  return (
  <>
 
 <Routes location={backgroundLocation || location}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findback_password" element={<FindBack/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route
        >
          <Route path="/" element={<Dashboard />}>
            <Route index element={<DashboardTheme />} />
            <Route path="books" element={<DashboardContent/>}/>
            <Route path="maps" element={<DashboardMap/>}/>
            <Route path=":username/:uni_code" element={<UserContent />} >
            <Route index element={<CollectBooks/>}/>
            <Route path="recommend" element={<RecommendBooks/>}/>
            <Route path="recommend/:pdfPath" element={<EditRecommendPanel />} />
            </Route>
            <Route path="upload" element={ <AdminRoute element={<UploadContent />} />}/>
            <Route path="statistics" element={ <AdminRoute element={<Statistics />} />}/>
            <Route path="settings" element={<SettingsContent />} />
          </Route>
          <Route path="/PDFreader/:pdfPath" element={<ReaderComments />} />
          
        </Route>
      </Routes>

      {/* ✅ Modal overlay route — matched on top of background */}
      {backgroundLocation && (
        <Routes location={location}>
          <Route
          
          >
            <Route path="/settings/profile" element={<PopupWindow />} />
          </Route>
        </Routes>
      )}
      

 </>

  )
}

export default App;