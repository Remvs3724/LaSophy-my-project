import { Card, Input ,Form, Button, message} from "antd";
import { useRef, useState,} from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
const {TextArea}=Input


const EditRecommendPanel=()=>{
    const location = useLocation();
  const book = location.state?.book;

  const onFinish= async (values)=>{
    const passValuesToRecommend={...values, uni_code:book.uni_code, username: book.username, pdf_path: book.pdf_path}
    console.log('data', passValuesToRecommend)
    const response=await axios.post('http://localhost:5001/recommend', passValuesToRecommend)
    if(response.data.message==="Recommend successful"){
     message.success(response.data.message)
    }else{
        message.error(response.data.message)
    }

}
    
    // Save to backend here
    return (
        <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", 
      }}
    >
        <Card title={`Recommend: ${book?.title?.length >50 ? book.title.slice(0, 50) + '...' : book?.title || "this Book"}`}
        >
      <Form onFinish={onFinish} style={{width:"100%", height:"100%"}}>
      <Form.Item name="recommend">
        <TextArea style={{width:"100%", height:"200px"}}/>
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
            <Button 
            style={{marginTop:"20px", fontWeight:"bold"}}
            type="text" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
      </Form>

      </Card>
     </div>



    )

}
export default EditRecommendPanel