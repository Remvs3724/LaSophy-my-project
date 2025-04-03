import { Form, Input, Button, Card, message, } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [form] = Form.useForm();
    const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, values);
      if(response.data.message==="Signup successful!"){
       message.success(response.data.message, 1);

      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
    } else{
        message.error(response.data.message,2);
    }
    }  catch (error) {
      message.error(error.response?.data?.message || "Signup failed");
    }
  };
   const handleSendCode= async ()=>{
    try{
      const email=form.getFieldValue("email")
      if(!email){
        message.error("Please enter email first!")
        return;
      }

      const response=await axios.post(`${process.env.REACT_APP_API_URL}/send_code`, {email})
      if (response.data.message) {
        message.success("Verification code sent to your email");
      }
    }catch(error){
      message.error(error.response?.data?.message || "Failed to send verification code");

    }
        

  }

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
      <Card title="Sign Up" style={{ width: 400 }}>
        <Form  form={form}  layout={ "vertical"} onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your nickname!" }]}>
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter a password!" }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          
          <Form.Item label="Verify code" name="verify_code" 
          rules={[{ required: true, message: "Please enter code!" }]}>
            <div style={{display:"flex", alignContent:"center"}}>
               <Input style={{width:"270px"}} 
               placeholder="Enter code"
               />
               
               <Button type="primary"  
               style={{marginLeft:"30px"
               }}
               onClick={()=>{handleSendCode()}}
               > Send</Button>
      
               </div>
               
           </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{marginTop:"30px"}}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;