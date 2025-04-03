import axios from 'axios';

export const fetchPosts = async () => {
    const response = await axios.get('/api/posts');
    return response.data.posts;
};

export const fetchPost = async (postID) => {
    const response = await axios.get(`/api/post/${postID}`);
    return response.data;
};

export const addPost = async (postData) => {
    const response = await axios.post('/api/add-post', postData);
    return response.data;
};

export const addComment = async (commentData) => {
    const response = await axios.post('/api/comment', commentData);
    return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await axios.post(`/api/delete-comment/${commentId}`);
    return response.data;
};