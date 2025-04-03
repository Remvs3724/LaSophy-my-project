
import {useState } from "react";
import axios from "axios";
import { timeAgo } from "./timecalculator/timeout";
import { Input, Avatar, Space, Button, message, List, Empty} from "antd";
import { DownOutlined, UpOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const CommentList = ({ comments, setComments, currentUser, onReply, replyingTo}) => (
    <>
    {comments.length > 0 ? (
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
    ): (
        <Empty description="No comments yet" />
    )}
    </>
  );
  const CommentItem = ({ comment, setComments, currentUser, onReply, replyingTo, level = 0 }) => {
    const [replyText, setReplyText] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showMoreReply, setShowMoreReply] = useState(false);
    const navigate = useNavigate();
    const fixedMarginLeft = level === 0 ? 0 : 20;
  
    const handleReplySubmit = () => {
        if (!replyText.trim()) return;
        axios.post(`${process.env.REACT_APP_API_URL}/comments`,
            {
                content: replyText,
                createdBy: currentUser? currentUser.username : 'Guest',
                cmt_book: comment.cmt_book,
                parentId: comment.commentId,
                parentIdUsername: comment.createdBy,
                like: 0,
                uni_code: currentUser? currentUser.uni_code: null,
            },
            { withCredentials: true }
        ).then(response => {
            if(response.data.message==='Please login first'){
                message.error(response.data.message)
              }else{
            message.success(response.data.message);
            const newReply = response.data.comment;
            setComments(prevComments => [...prevComments, newReply]);
            setReplyText("");
            setShowReplyBox(false);
            onReply("")
              } 
            
        });
    };
    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            marginLeft: `${fixedMarginLeft}px`,
            paddingLeft: "10px", 
            paddingBottom: "10px",
            marginTop:"20px"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" , padding:"0px", margin:"0px"}}>
                <Avatar size={40}
                style={{
                    flexShrink: 0,           
                    borderRadius: "50%",    
                    overflow: "hidden",     
                  }}
                onClick={()=>navigate(`/${comment.createdBy}/${comment.uni_code}`)}
                >{comment.createdBy[0].toUpperCase()}</Avatar>
                <div style={{ display: "flex", flexDirection: "column", marginTop: "5px"}}>
                    <b style={{ marginBottom: "-10px", }}>{comment.createdBy}
                      <span style={{ marginLeft: "10px", color: "#888", fontSize: "12px" }}>{timeAgo(comment.createdAt)}</span>
                    </b>
                    <p style={{
                        marginBottom:"8px"
                    }}>
                    {comment.parentId && ( 
                            <span style={{ fontWeight: "bold", color: "#555" }}>
                                Reply to @{comment.parentIdUsername}:{" "}
                            </span>
                        )}
                        {comment.content}</p>
                </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                type="text"
                    onClick={() => {
                        setShowReplyBox(!showReplyBox);
                        onReply(comment.commentId);
                    }}
                    style={{ cursor: "pointer",
                    width:"50px",
                    fontSize:"small",
                    fontWeight:"bold",
                    alignItems:"flex-start",
                    height:"20px"

                    }}
                >
                    Reply
                </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start"}}>
                {comment.replies.length > 0 && (
              <Button
               type="text"
               icon={showMoreReply ? <UpOutlined/>:<DownOutlined/>}
               style={{
                fontWeight:"bold",
                alignItems:"flex-start",
                color:"#1a73e8",
                height:"20px"
               }}
                onClick={()=>setShowMoreReply(!showMoreReply)}
              >{comment.replies.length} {comment.replies.length > 1 ? "replies" : "reply"}</Button>
                   )}
            </div>
            {/* Show Reply Box if replying to this comment */}
            {replyingTo === comment.commentId && (
                <div style={{ marginTop: "10px", marginLeft: "40px" }}>
                    <TextArea
                        value={replyText}
                        placeholder={`Reply to ${comment.createdBy}`}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        style={{
                            width: "100%",
                            resize: "none",
                            border: "1px solid #ccc",
                            border: "none",
                            borderBottom: "1px solid gray", 
                            outline: "none", 
                            background: "transparent", 
                            fontSize: "14px"
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
  
            {/* Render Nested Replies with Increased Indentation */}
            {comment.replies.length > 0  && showMoreReply && (
                <div style={{ marginTop: "10px" }}>
                    {comment.replies.map(reply => (
                        <CommentItem 
                            key={reply.commentId} 
                            comment={reply} 
                            setComments={setComments} 
                            currentUser={currentUser} 
                            onReply={onReply} 
                            replyingTo={replyingTo} 
                            level={1} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
  export default CommentList