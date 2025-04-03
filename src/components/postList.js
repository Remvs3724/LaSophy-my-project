import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts().then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h1>Post List</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;