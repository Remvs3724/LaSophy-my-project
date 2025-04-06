import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    AreaChartOutlined,
    UploadOutlined,
  } from "@ant-design/icons";
  import { Menu} from "antd";
  import { useNavigate, useLocation,useParams} from "react-router-dom";

const DashboardSider=({user})=>{
  const {username, uni_code}=useParams()
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const selectedKey=path==='/'? "1" //never try this before...
                     :path.startsWith(`/${username}/${uni_code}`) ? '2'
                     :path.startsWith('/statistics') ? '3'
                     :path.startsWith('/upload') ? '4'
                     :path.startsWith('/settings') ? '5'
                     :'';

    return (
      <>
        <div 
        className="logo" style={{ color: "white", textAlign: "center", padding: "20px 0" }}>
        
          <img 
          style={{ width: "50px", height: "50px" }}
          src={'https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/themeCover/logo.png'}
          />
        </div>
        <Menu theme="dark" 
        mode="inline" 
        selectedKeys={[selectedKey]}
        >
          <Menu.Item key="1" 
          icon={ <DashboardOutlined style={{fontSize:"20px"}}/>}
          onClick={() => navigate("/")}><span style={{fontSize:"15px", fontWeight:"bold"}}>Dashboard</span></Menu.Item>
          { user && (
          <Menu.Item key="2" 
          icon={<UserOutlined style={{fontSize:"20px"}}/>}
          onClick={()=>navigate(`/${user.username}/${user.uni_code}`)}
          ><span style={{fontSize:"15px", fontWeight:"bold"}}>Users</span></Menu.Item>)}
          {user?.admin_user && (
          <Menu.Item key="3" 
          icon={<AreaChartOutlined style={{fontSize:"20px"}} />}
          onClick={()=>navigate(`/statistics`)}
          ><span style={{fontSize:"15px", fontWeight:"bold"}}>Statistics</span></Menu.Item>)}
          {user?.admin_user && (
          <Menu.Item key="4" 
          icon={<UploadOutlined style={{fontSize:"20px"}}/>}
          onClick={()=>navigate(`/upload`)}
          ><span style={{fontSize:"15px", fontWeight:"bold"}}>Upload</span></Menu.Item>)}
          <Menu.Item key="5" 
          icon={<SettingOutlined style={{fontSize:"20px"}}/>}
          onClick={()=>navigate("/settings")}
          ><span style={{fontSize:"15px", fontWeight:"bold"}}>Settings</span></Menu.Item>
        </Menu>

      </>
     

    )
}

export default DashboardSider