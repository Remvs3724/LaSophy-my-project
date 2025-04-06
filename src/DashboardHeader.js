import { useMemo, useContext} from "react";
import { Layout, Avatar, Button, Popover, Card } from "antd";
import { LoginOutlined,LogoutOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./Context/useContext";
const { Header } = Layout;

const DashboardHeader = () => {
  const {currentUser, setCurrentUser, setcurrentUserProfile}=useContext(UserContext)
  const navigate = useNavigate();
  // if i wanna keep the color unchanged, i should use localstorage...
  const avatarColor = useMemo(() => {
    const colors = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#1890ff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []); 
  
  const handleLogout = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true })
      .then(() => {
        navigate("/");
        setCurrentUser("");
        setcurrentUserProfile("");
        
      })
      .catch(error => console.error("Logout error:", error));
  };
    //need to adjust the layout of this
  const profileCard = currentUser && (
    <Card style={{ width: 250, textAlign: "center" }}>
      <Avatar size={50}>{currentUser.username?.[0]?.toUpperCase() || "?"}</Avatar>
      <h3 style={{ marginTop: 10 }}>{currentUser.name}</h3>
      <p><strong>Gender:</strong> {currentUser.gender || "Not specified"}</p>
      <p><strong>Bio:</strong> {currentUser.bio || "No bio available"}</p>
    </Card>
  );


  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px", 
        alignItems: "center",
        padding: "0 20px",
        background: "#fff",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    > 
     <div style={{ display: "flex", alignItems: "center", gap: "15px",flexShrink: 0,minWidth: "250px"}}>
      <h2 style={{ margin: 0, fontFamily: 'serif'}}>LaSophy</h2>
      <img
      alt=""
      style={{width:"120px", height:"60px"}}
      src={'https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/themeCover/headerLogo.png'}
      />
     </div>
      <div style={{ display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems:"center",
        justifyContent: "flex-end",
        flex: 1,
       minWidth: "300px"}}>
        {currentUser ? (
          <>{currentUser.admin_user && 
           <span> Administrator</span>
           }
            <Popover content={profileCard} trigger="hover">
              <Avatar style={{ cursor: "pointer" , backgroundColor: avatarColor}} >
              {currentUser.username?.[0]?.toUpperCase() || "?"}
                </Avatar>
            </Popover>
            <span>Welcome, {currentUser.username}</span>
            <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button type="primary" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default DashboardHeader;




