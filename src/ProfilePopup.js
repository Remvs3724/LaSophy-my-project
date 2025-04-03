import { Input, Button, Space, Card, Form, message, Tag} from "antd";
import { useNavigate, useLocation} from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import axios from "axios";
import { UserContext } from "./Context/useContext";
import { DndContext } from "@dnd-kit/core";
const { TextArea } = Input;
const tagsList = [
  "feminism", "progressive"
];

const PopupWindow = () => {
    const {currentUserProfile, setcurrentUserProfile}=useContext(UserContext)
    const [inputValue, setInputValue] = useState("");
    const [draggedTag, setDraggedTag] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm(); 

    const handleDragStart = (event) => {
      setDraggedTag(event.active.data.current.tag);
    };
  
    const handleDragEnd = () => {
      if (draggedTag) {
        setInputValue((prev) => (prev ? prev + ", " + draggedTag : draggedTag));
        setDraggedTag(null);
      }
    };
  

  const handleClose = () => {
    navigate(-1); // Go back to the previous route (e.g., /:username/:uni_code)
  };
  const handleUserinf= async(values)=>{
    try{
        const updatedValues = {
            ...values,
            uni_code: currentUserProfile.uni_code,
          };

    const response=await axios.post(`${process.env.REACT_APP_API_URL}/settings/profile`, updatedValues)
    if(response.data.message==="Update successful" && response.data.updatedInfo){
        message.success(response.data.message, 1);
        setcurrentUserProfile( response.data.updatedInfo)
        navigate(-1); 
       

        
    } else if(response.data.message==="Update failed"){
        navigate(-1)
    }
    else{
        message.success(response.data.message, 1);
        navigate(-1); 
    }
    }
    catch(error){

    }
    

  }
  useEffect(() => {
    if (currentUserProfile) {
      form.setFieldsValue({
        username: currentUserProfile.username || '',
        email: currentUserProfile.email || '',
        ideology: currentUserProfile.ideology ?? '',
        bio: currentUserProfile.bio ?? '',
      });
    }
  }, []);


  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "35%",
        width: "500px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >   
    <div style={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
    <h2 style={{marginTop:"10px"}}> Edit profile</h2>
    <div style={{ display:"flex",gap:"10px"}}>
    <Button 
    style={{borderRadius:"20px"}}
    onClick={() => form.submit()}
    > Save</Button>
    <Button
    onClick={()=>handleClose()}
    style={{
        borderRadius:"20px"
    }}>Cancel</Button>
    </div>
    </div>
      <Card>
        <Form  form={form} layout="vertical" onFinish={handleUserinf}>
            <Form.Item label="Username" name="username">
            <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
            <Input/>
            </Form.Item>
            <Form.Item label="Ideology" name="ideology">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ marginBottom: 16 }}>
        <h3>Ideology</h3>
        <TextArea
          placeholder="Choose your thoughts"
          autoSize={{ minRows: 3 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 24 }}>
        <h4>Tags</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 ,}}>
          {tagsList.map((tag) => (
            <DraggableTag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </DndContext>
            </Form.Item>
            <Form.Item label="Bio" name="bio">
            <Input placeholder="Writing something" />
            </Form.Item>
        </Form>


      </Card>
    </div>
  );
};
function DraggableTag({ tag }) {
  return (
    <div
      draggable
      style={{backgroundColor:"#f5f5f5"}}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", tag);
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      <Tag color={tag}>{tag}</Tag>
    </div>
  );
}
export default PopupWindow;