import { useState, useEffect} from "react";
import axios from "axios";
import { Card, Input,Avatar, Space, Button, message} from "antd";
import {UserOutlined} from "@ant-design/icons";
import CommentList from "./Rendercomments";
const { TextArea } = Input;
const Comments=({bookInfo, comments, currentuser, setComments})=>{
    const [comment, setComment] = useState(" ");
    const [isFocused, setIsFocused] = useState(false);
    const [orderComment, setOrderedComments]=useState("")
    const [replyingTo, setReplyingTo] = useState(null);
    const buildTree = (data) => {
      if (!Array.isArray(data)) {
          console.error("Error: buildTree received invalid data", data);
          return [];
      }
  
      const filteredData = data.filter(comment => comment && comment.commentId !== undefined);
  
      if (filteredData.length === 0) {
          console.warn("Warning: No valid comments found!");
      }
      const map = {};
      filteredData.forEach((comment) => {
          map[comment.commentId] = { ...comment, replies: [] };
      });
  
      const tree = [];
      filteredData.forEach((comment) => {
          if (comment.parentId) {
              if (map[comment.parentId]) {
                  map[comment.parentId].replies.push(map[comment.commentId]);// amazing 
              }
          } else {
              tree.push(map[comment.commentId]);
          }
      });
  
      return tree;
  };

  useEffect(() => {
    console.log('comment', comments)
    if (!Array.isArray(comments)) {
      console.error("Error: comments is not an array!", comments);
      return;
  }
  if (comments.length === 0) {
      console.warn("Skipping buildTree because comments is empty.");
      return;
  }
  const newTree = buildTree(comments);
  if (newTree.length === 0) {
      console.warn("Warning: buildTree returned an empty tree!");
  }
    
  setOrderedComments([...newTree]); 
  
}, [comments]);
    
  const handleSubmit=()=>{
    if (!comment.trim()) return;
    const currentComment = comment; 
    setComment(""); 
     
    axios.post(`${process.env.REACT_APP_API_URL}/comments`, 
        {content:currentComment,
        createdBy: currentuser? currentuser.username : 'Guest'|| null,
        cmt_book: bookInfo.pdf_path,
        parentId: replyingTo || null,
        like:0,
        uni_code: currentuser? currentuser.uni_code : null
        },
        { withCredentials: true }
    ).then(response=>{
      if(response.data.message==='Please login first'){
        message.error(response.data.message)
      }else{
            message.success(response.data.message)
            const newComment = response.data.comment; 
            setComments(prevComments => [...prevComments, newComment]); 
      }
          })
        
      
  }
return (
    <Card
          title=""
          bordered={false}
          style={{
            height: "60%",
            flex: 1,
            overflowY: "auto",
            background: "white",
            padding:"5px",
            background: "#fff",
          }}
        >
        <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",  
            padding: "10px",
            borderBottom: "1px solid #ddd",
            width: "100%"  
          }}
        >
        <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
          <TextArea
          value={comment}
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setIsFocused(true)}  
          onBlur={() => !comment.trim() && setIsFocused(false)} 
          autoSize={{ minRows: 1, maxRows: 3 }} 
          style={{
            flex: 1,  
            borderRadius: "20px", 
            padding: "10px",
            resize: "none",  
            border: "1px solid #ccc",
          }}
          ></TextArea>
          {isFocused && (
          <Space style={{ marginTop: "5px", display: "flex", justifyContent: "flex-end" }}>
            <Button 
            type="text"
            style={{
                width:"50px",
                fontSize:"small",
                fontWeight:"bold"

            }}
              onClick={() => { 
                setComment(""); 
                setIsFocused(false); 
              }}
            >
              Cancel
            </Button>
            <Button 
            style={{
                width:"70px",
                fontSize:"small",
                fontWeight:"bold",
            }}
            type="text" disabled={!comment.trim()}
            onClick={()=>handleSubmit(comment)}
            >
              Comment
            </Button>
          </Space>
        )}
        </div>
        <CommentList
                comments={orderComment}
                setComments={setComments}
                currentUser={currentuser}
                onReply={setReplyingTo}
                replyingTo={replyingTo}
                setOrderedComments={setOrderedComments}
                buildTree={buildTree}
            />
        </Card>

   
)

}
/*
const CommentList = ({ comments, setComments, currentUser, onReply, replyingTo, setOrderedComments, buildTree}) => (
  <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(comment) => (
          <CommentItem
              key={comment.commentId}
              comment={comment}
              setComments={setComments}
              currentUser={currentUser}
              onReply={onReply}
              replyingTo={replyingTo}
          />
      )}
  />
);
const CommentItem = ({ comment, setComments, currentUser, onReply, replyingTo, level = 0 }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  

  const handleReplySubmit = () => {
      if (!replyText.trim()) return;

      axios.post(${process.env.REACT_APP_API_URL}/comments",
          {
              content: replyText,
              createdBy: currentUser? currentUser.username : 'Guest',
              cmt_book: comment.cmt_book,
              parentId: comment.commentId,
              like: 0,
          },
          { withCredentials: true }
      ).then(response => {
          message.success(response.data.message);
          const newReply = response.data.comment;
          setComments(prevComments => [...prevComments, newReply]); 

          setReplyText("");
          setShowReplyBox(false);
      });
  };
  return (
      <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          marginLeft: `${level + 10}px`, // ✅ Indent replies
          borderLeft: level > 0 ? "2px solid #ddd" : "none", // ✅ Add line for replies
          paddingLeft: "10px", 
          paddingBottom: "0px",
      }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" , padding:"0px"}}>
              <Avatar size={40}>{comment.createdBy[0].toUpperCase()}</Avatar>
              <div style={{ display: "flex", flexDirection: "column", marginTop: "5px"}}>
                  <b style={{ marginBottom: "-10px", }}>{comment.createdBy}
                    <span style={{ marginLeft: "10px", color: "#888", fontSize: "12px" }}>{timeAgo(comment.createdAt)}</span>
                  </b>
                  <p>{comment.content}</p>
              </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0px" }}>
              <Button
              type="text"
                  onClick={() => {
                      setShowReplyBox(!showReplyBox);
                      onReply(comment.commentId);
                  }}
                  style={{ cursor: "pointer",
                  width:"50px",
                  fontSize:"small",
                  fontWeight:"bold"
                  }}
              >
                  Reply
              </Button>
              
          </div>
          {replyingTo === comment.commentId && (
              <div style={{ marginTop: "10px", marginLeft: "40px" }}>
                  <TextArea
                      value={replyText}
                      placeholder="Write a reply..."
                      onChange={(e) => setReplyText(e.target.value)}
                      autoSize={{ minRows: 1, maxRows: 3 }}
                      style={{
                          width: "100%",
                          borderRadius: "10px",
                          padding: "10px",
                          resize: "none",
                          border: "1px solid #ccc",
                      }}
                  />
                  <Space style={{ marginTop: "5px", display: "flex", justifyContent: "flex-end" }}>
                      <Button type="text" onClick={()=> {
                      setShowReplyBox(false)
                      setReplyText("")
                       onReply(null)
                      }}>Cancel</Button>
                      <Button type="primary" onClick={handleReplySubmit} disabled={!replyText.trim()}>Reply</Button>
                  </Space>
                
              </div>
                  
          )}

          
          {comment.replies.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                  {comment.replies.map(reply => (
                      <CommentItem 
                          key={reply.commentId} 
                          comment={reply} 
                          setComments={setComments} 
                          currentUser={currentUser} 
                          onReply={onReply} 
                          replyingTo={replyingTo} 
                          level={level + 1} 
                      />
                  ))}
              </div>
          )}
      </div>
  );
};
*/

export default Comments