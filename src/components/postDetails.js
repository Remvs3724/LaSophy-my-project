import React, { useEffect, useState } from 'react';
import { fetchPost, addComment, deleteComment } from '../api';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    
    useEffect(() => {
        fetchPost(postID).then(data => setPost(data));
    }, [postID]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        await addComment({ content: comment, postId: postID });
        setComment('');
        fetchPost(postID).then(data => setPost(data)); 
    };

    const handleDelete = async (commentId) => {
        await deleteComment(commentId);
        fetchPost(postID).then(data => setPost(data));
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h2>{post.post.title}</h2>
            <h3>by @{post.postOwner.name}</h3>
            <p>{post.post.content}</p>
            <hr />
            <form onSubmit={handleCommentSubmit}>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            {post.comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.name} @{comment.createdAt}</p>
                    <p>{comment.content}</p>
                    <button onClick={() => handleDelete(comment.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostDetail;