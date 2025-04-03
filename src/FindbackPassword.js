import { Card,Form, Input, Button,message} from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FindBack=()=>{
  const navigate=useNavigate()
  const [form] = Form.useForm();
  const [isUserExist, setUserExist]=useState(false)
  const [isVerify, setVerify]=useState(false)

     const handlefinduser= async()=>{
        const email=form.getFieldValue("email")
        try{
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/findback`, {email})
        if(response.data.message==="User exists"){
            message.success(response.data.message)
            setUserExist(true)
        } else{
            message.success(response.data.message)
            setUserExist(false)
        }
      }
        catch(error){
            message.error(error.response?.data?.message || "Failed");

        }
    }
        const handleSubmitPassword= async()=>{
            const password=form.getFieldValue("password")
            const email=form.getFieldValue("email")

          try{
            const response=await axios.post(`${process.env.REACT_APP_API_URL}/updatepassword`, {password, email})
            if(response.data.message==="Update the password successful"){
               message.success(response.data.message)
               setTimeout(()=>{
                navigate('/login')

               }, 2000)
            }else{
               message.error(response.message.data)
            }

          } 
          catch(error){
            message.error(error.response?.data?.message || "Failed to update password");


          }

        }
         const handleSendCode= async(values)=>{
            
           try{
            const email=form.getFieldValue("email")
            if(!email){
                message.error("Please enter email first!")
                return;
              }
            const response=await axios.post(`${process.env.REACT_APP_API_URL}/get_code`, {email})
             if (response.data.message) {
               message.success("Verification code sent to your email");
      }

            }catch(error){
            message.error(error.response?.data?.message || "Failed to send verification code");
            }



         }

         const handleVerifyCode= async()=>{
            try{
            const code=form.getFieldValue("verify_code")
            const email=form.getFieldValue("email")
        const response=await axios.post(`${process.env.REACT_APP_API_URL}/verifycodeforpassword`, {code, email})
             if (response.data.message==="Verify successful!") {
               message.success(response.data.message)
               setVerify(true)
             } else{
                message.error(response.data.message)
             }
      }
             catch(error){
                message.error(error.response?.data?.message || "Failed to  verify code");

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
        <Card 
        title="Findback password"
        style={{ width: 350 }}>
            <Form form={form} layout="vertical">
            <Form.Item label="Email" name="email"> 
                <Input
                placeholder="Enter you email">
                </Input>
             </Form.Item>
             {isUserExist &&(
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
               
           </Form.Item>)}
            {isVerify && 
            (<>
            <Form.Item label="New password" name="password" rules={[{ required: true, message: "Please enter a password!" }]}>
                <Input.Password
                placeholder="Enter your new password"/>
               
            </Form.Item>

            
            <Form.Item label="Confirm password" name="confirmPassword"
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
                <Input.Password
                placeholder="Enter again"/>
               
            </Form.Item> </>)}

            <Form.Item>
            { isUserExist? ( isVerify? ( 
                <Button type="primary" htmlType="submit" block
                onClick={()=>{handleSubmitPassword()}}
                >
                  Submit the password
                </Button>
            ):
                (<Button type="primary" htmlType="submit" block
                onClick={()=>{handleVerifyCode()}}
                >
                  Verify email
                </Button>)
            ):(
            <Button type="primary" htmlType="submit" block
            onClick={()=>{handlefinduser()}}
            >
                  Continue
            </Button>)}  
          </Form.Item>
            </Form>

        </Card>


    </div>


    )
}
export default FindBack