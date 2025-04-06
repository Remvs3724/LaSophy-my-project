import {  useContext, useEffect } from "react";
import { UserContext } from "./Context/useContext";
import { useNavigate, useParams} from "react-router-dom";
import { Card, Dropdown, Menu, message} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import axios from "axios";
const CollectBooks=()=>{
const navigate = useNavigate();

   const {currentUser, userBookCollects,currentUserProfile, setUserBookCollects}=useContext(UserContext)
   const { username, uni_code } = useParams();

   useEffect(()=>{
    console.log("data",userBookCollects)
   });

   const handleMenuClick=(book, e)=>{
    e.domEvent.stopPropagation();
    if(e.key==="cancel"){
    const cancelTarget={uni_code: book.uni_code, pdf_path: book.pdf_path}
      axios.post(`${process.env.REACT_APP_API_URL}/cancelcollects`, cancelTarget)
      .then(response=>{
        if(response.data.message==="Delete collects"){
          message.success(response.data.message)
          setUserBookCollects(response.data.CollectBooks)
        }
      }).catch(error => console.error("Fail to cancel:", error));


    }else if(e.key==="recommend"){
        navigate(`/${username}/${uni_code}/recommend/${book.pdf_path}`,{
            state: {book}, 
          })
    }

   }
   const menu =(book) =>(
    <Menu
      items={[
        { key: "cancel", label: "Cancel collect" },
        { key: "recommend", label: "Recommend this book" },
      ]}
      onClick={(e) => {
        handleMenuClick(book, e)
        
      }}
    />
  );
   return(
    <>
     { userBookCollects.length>0  && 
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", padding: "0px", marginTop:"20px", marginLeft:"20px"}}>
        {userBookCollects.map((book)=>(
             <Card
                   
                    hoverable
                    style={{ width: 140 ,
                        
                      }}
                    styles={{body: {
                        padding: "10px"}}}
                    cover={
                        <div style={{ position: "relative" }}>
                        <img 
                            alt={book.title} 
                            src={`https://storage.googleapis.com/lasophy-4e0ff.firebasestorage.app/imgCover/${book.img_path}`} 
                            style={{ height: "220px", objectFit: "cover" ,width: "100%", display: "block" }} 
                        />
                        {currentUserProfile?.uni_code===currentUser?.uni_code && 
                        <Dropdown overlay={menu(book)} trigger={["click"]}>
                        <MoreOutlined
                             style={{
                                position: "absolute",
                                top: "6px",
                                right: "6px",
                                fontSize: "16px",
                                color: "#333",
                                background: "rgba(255, 255, 255, 0.8)",
                                borderRadius: "50%",
                                padding: "2px",
                                cursor: "pointer",
                                zIndex: 1
                              }}
                            onClick={(e) => {
                              e.stopPropagation(); 

                            }}/>
                        </Dropdown>}
                        </div>
                    }
                    onClick={() => navigate(`/PDFreader/${book.pdf_path}`)}
        >      
          <div style={{
               fontSize: "15px",
               fontWeight: "bold",
               lineHeight: "1.2em",
               display: "-webkit-box",
               WebkitLineClamp: 2,           // 👈 how many lines to show
               WebkitBoxOrient: "vertical",
               overflow: "hidden",
               textOverflow: "ellipsis"
               }}>{book.title}</div>
            <div style={{
               fontSize: "12px",
               lineHeight: "1.2em",
               display: "-webkit-box",
               WebkitLineClamp: 2,           
               overflow: "hidden",
               textOverflow: "ellipsis"
               }}>by {book.author}</div>
            </Card>


        ))}


     </div> }

     </>

   )
}
export default CollectBooks