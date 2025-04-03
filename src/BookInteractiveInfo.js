import { HeartOutlined, CommentOutlined, StarOutlined, StarFilled, HeartFilled,
    FieldTimeOutlined
} from "@ant-design/icons";
import { Card,message} from "antd"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./Context/useContext";
import axios from "axios";
import { useParams } from "react-router-dom";
const InteractiveInfo=({bookInfo, comments, likeSituation, countLikes, collectSituation, countCollects})=>{
    const {pdf_path}=useParams()
    const {currentUser, setUserBookCollects}=useContext(UserContext)
    const [isClickCollects, setIsClickCollects]=useState(false)
    const [countCollectschange, setCountCollectsChange]=useState(0)
    const [isClickLike, setIsClickLike]=useState(false)
    const[countLikesChange, setCountLikesChange]=useState(0)


    const handeleClickLike=()=>{
        const UpdatedLikes={pdf_path:bookInfo.pdf_path, currentUser: currentUser}
        axios.post(`${process.env.REACT_APP_API_URL}/interactives`, UpdatedLikes,{ withCredentials: true })
        .then(response=>{
            if(response.data.message==="Like"){
                message.success(response.data.message, 0.5)
                setCountLikesChange(response.data.change_likes)
            }else if(response.data.message==="Cancel like"){
                message.success(response.data.message, 0.5)
                setCountLikesChange(response.data.change_likes)
            }
            else{
                message.error(response.data.message, 0.5)
            }

        })
    }

    const handleClickCollect=()=>{
        const UpdatedCollects={pdf_path:bookInfo.pdf_path, currentUser: currentUser}
        axios.post(`${process.env.REACT_APP_API_URL}/collects`, UpdatedCollects,{ withCredentials: true })
        .then(response=>{
            if(response.data.message==="Collect"){
                message.success(response.data.message, 1)
                setCountCollectsChange(response.data.change_collects)
                setUserBookCollects(response.data.BookCollects)
                
            }else if(response.data.message==="Cancel collect"){
                message.success(response.data.message, 1)
                setCountCollectsChange(response.data.change_collects)
                setUserBookCollects(response.data.BookCollects)
            }
            else{
                message.error(response.data.message, 0.5)
            }

        })

    }
useEffect(()=>{
    if (bookInfo) {
        setIsClickLike(likeSituation)//think about why i write in this way
        setCountLikesChange(countLikes)
        setIsClickCollects(collectSituation)
        setCountCollectsChange(countCollects)

      }
},[bookInfo])


return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",   backgroundColor:"#f5f5f5"}}>

       <p style={{marginLeft:"5px"}}><FieldTimeOutlined style={{fontSize:"15px"}}/> : <span style={{fontSize:"13px",color: "#888"}}>Uploaded </span></p> 
        <div style={{display:"flex", gap:"60px", marginRight:"30px"}}>
        <div style={{display:"flex", flexDirection: "column",alignItems: "center" , gap:"5px", marginTop:"10px"}}>
        <CommentOutlined style={{fontSize:"20px"}}/>
        <span>{comments.length}</span>

        </div>
        <div style={{display:"flex", flexDirection: "column",alignItems: "center" , gap:"5px",marginTop:"10px"}}> 
            {isClickCollects ? (<StarFilled style={{fontSize:"20px"}}
          onClick={()=>{
            setIsClickCollects(!isClickCollects)
            handleClickCollect()
            }}
        /> ) : (<StarOutlined style={{fontSize:"20px"} }
          onClick={()=>{
            setIsClickCollects(!isClickCollects)
            handleClickCollect()
            }}
        />)}
            <span>{countCollectschange}</span>
        </div>
        <div style={{display:"flex", flexDirection: "column",alignItems: "center" , gap:"5px",marginTop:"10px"}}>
        {isClickLike ? (<HeartFilled style={{fontSize:"20px"}}
          onClick={()=>{
            setIsClickLike(!isClickLike)
            handeleClickLike()
        }}
        />) : (<HeartOutlined style={{fontSize:"20px"} }
          onClick={()=>{
            setIsClickLike(!isClickLike)
            handeleClickLike()

        }}
        />)}
        <span>{countLikesChange}</span>
        </div>
        </div>
    </div>
  

)
}
export default InteractiveInfo