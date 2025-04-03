import { Layout, Menu, theme } from "antd";
import { useState, useEffect ,useContext} from "react";
import { UserContext } from "./Context/useContext";
import DashboardHeader from "./DashboardHeader";
import DashboardSider from "./Sider";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const {currentUser}=useContext(UserContext)
  const [user, setUser]=useState(" ")
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
 useEffect(()=>{
      setUser(currentUser)
},[currentUser])
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <DashboardSider user={user}/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <DashboardHeader/>
        </Header>
        <Content style={{ margin: "16px", background: colorBgContainer }}>
        <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;