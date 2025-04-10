import { useEffect, useContext} from "react";
import axios from "axios";
import {CalendarOutlined,BulbOutlined,SettingOutlined,ProfileOutlined} from "@ant-design/icons";
import {  Card,  Avatar, Space, Button, message, } from "antd";
import { formatToMonthYear} from "./timecalculator/jointime";
import { useParams,useNavigate, useLocation, Outlet} from 'react-router-dom';
import { UserContext } from "./Context/useContext";


const UserContent=()=>{
    const {currentUser, currentUserProfile, setcurrentUserProfile,userBookCollects, setUserBookCollects}=useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();
    const {username, uni_code}=useParams()
 
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/${username}/${uni_code}`, { withCredentials: true })
        .then(response=>{
            if(!response.data.userProfile || response.data.message){
                message.error(response.data.message)
            }else{
            setcurrentUserProfile(response.data.userProfile)
            setUserBookCollects(response.data.userCollectBooks)
            }
        })
    },[])

    const openProfilePopup = () => {
        navigate('/settings/profile', { state: { backgroundLocation: location} });
      };
    

 return (
    <>
<Card>
    <div style={{display: "flex", alignItems: "flex-start" , gap:"20px"}}>
    <Avatar size={120} style={{flexShrink: 0, borderRadius: "50%", overflow: "hidden", }}> {currentUserProfile?.username?.[0]?.toUpperCase() || "?"}</Avatar>

    <div style={{marginLeft:"30px", marginTop:"0px"}}> 
        <Space>
        <span style={{ fontWeight: "bold", fontSize:"x-large", marginTop:"0px"}}>
            {currentUserProfile?.username}
        </span>
        { currentUserProfile?.uni_code===currentUser?.uni_code &&
        <Button style={{ borderRadius:"20px", marginLeft:"50px"}}
        icon={<SettingOutlined />}
        onClick={()=>openProfilePopup()}
        > Edit profile</Button>}
        </Space>
        
        <div> 
            <p><BulbOutlined style={{ fontSize: '15px' }}/></p>
        </div>
        <div>
            <p >{<CalendarOutlined style={{ fontSize: '15px' }}/>}: 
           <span style={{ marginLeft: "5px", color: "#888", fontSize: "15px" }}> Joined </span>
            <span style={{ fontWeight:"bold"}}>{formatToMonthYear(currentUser?.createdAt)}</span></p>
        </div>
        <div>
        <p>{<ProfileOutlined style={{ fontSize: '15px' }}/>}:
        <span style={{fontWeight:"", fontSize:"16px"}}> {currentUserProfile?.bio}</span>
        </p></div>
        
    </div>
    
    </div>
</Card>
<Space style={{marginTop:"5px"}}>
<Button 
style={{borderRadius:"10px"}}
onClick={()=>navigate(`/${username}/${uni_code}`)}

>{userBookCollects===null ? '0 Collect': `${userBookCollects.length} Collects`}</Button>
<Button style={{borderRadius:"10px"}}
onClick={()=>navigate(`/${username}/${uni_code}/recommend`)}
>Recommended</Button>
</Space>
 <Outlet/>
</>


 )
}
export default UserContent