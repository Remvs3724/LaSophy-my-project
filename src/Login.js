import { Form, Input, Button, Card, message ,Switch} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext} from "react";
import { UserContext } from "./Context/useContext";

const Login = () => {
  const {setCurrentUser}=useContext(UserContext)
  const navigate = useNavigate();
  const [isChecked, setIsChecked]=useState(false)

  const onFinish = async (values) => {
    try {
      if(isChecked){
        values.isAdmin = true;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, values, { withCredentials: true });
      if(response.data.message==="Login successful"){
      message.success(response.data.message, 1);
      const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/`, {
        withCredentials: true,
      });
      if(userRes.data.loginOrnot){
        setCurrentUser(userRes.data.currentUser)

      }
      setTimeout(() => {
        navigate("/"); // Redirect to login page
      }, 2000);
      } else{
        message.error(response.data.message, 2);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      <Card title={
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <span>Login</span>
        <p>
        <span style={{marginRight:"10px"}}> {isChecked ? 'Administrator' :'User'  }</span>
        <Switch
        checked={isChecked}
        onChange={(checked)=>setIsChecked(checked)}
        />
        </p>
        </div>

      } style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item style={{ marginTop: "-8px", marginBottom: "16px" }}>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span
        style={{ color: "gray", cursor: "pointer" }}
        onMouseEnter={e => (e.target.style.color = "#1677ff")}
        onMouseLeave={e => (e.target.style.color = "gray")}
        onClick={()=>{navigate("/findback_password")}}
        >Forgot password?</span>
    </div>
  </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;