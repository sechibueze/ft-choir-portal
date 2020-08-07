import axios from 'axios';
import { 
  LOADING,
  LOADED,
  GET_ALL_POSTS, 
  SET_POST_BY_POST_ID,
  // SET_POSTS_BY_USER_ID,
  NEW_POST_CREATED,
  POST_DELETED,
  LIKE_POST,
  UNLIKE_POST,
  ADD_COMMENT_TO_POST,
  REMOVE_POST_COMMENT
 } from './types';
import { getConfigHeaders } from './authActions';
import { setAlert, handleResponseErrors } from './alertActions';

// Get ALl Posts
export const getAllPosts = () => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();
  axios.get('/api/posts', configHeaders)
    .then(({ data }) => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: data.data
      });
      dispatch({type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'GET_POSTITEMS_ALERT')
    });
};


// Get a single post by the post id
export const getPostByPostId = id => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();
  axios.get(`/api/posts/${id}`, configHeaders)
    .then(({ data }) => {
      dispatch({
        type: SET_POST_BY_POST_ID,
        payload: data.data
      });
      dispatch({type: LOADED })
    })
    .catch(err => {
      handleResponseErrors(err, 'SET_POST_ALERT')
    });
};

// Create a post
export const createPost = postData => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();
  const body = JSON.stringify(postData);
  axios.post('/api/posts', body, configHeaders)
    .then(({ data }) => {
      dispatch({
        type: NEW_POST_CREATED,
        payload: data.data
      });
      dispatch(setAlert('New post created', 'CREATE_POST_SUCCESS'))
      dispatch({type: LOADED })
    })
    .catch(err => {
      handleResponseErrors(err, 'CREATE_POST_ALERT')
    });
};

// route PUT 200 /api/posts/like/:id
// Like a Post
export const likePostByPostId = postId => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();
  axios.put(`/api/posts/like/${postId}`, {},  configHeaders)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data
      });

      dispatch(setAlert(data.message, 'LIKE_POST_SUCCESS'));
      dispatch({type: LOADED })
    })
    .catch(err => {     
      handleResponseErrors(err, 'LIKE_POST_ALERT')
    });
};

// route PUT 200 /api/posts/unlike/:id
// UnLike a Post
export const unlikePostByPostId = postId => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();
  axios.put(`/api/posts/unlike/${postId}`,{} , configHeaders)
    .then(({ data }) => {
      dispatch({
        type: UNLIKE_POST,
        payload: data
      });
      dispatch(setAlert(data.message, 'UNLIKE_POST_SUCCESS'));
      dispatch({type: LOADED })
    })
    .catch(err => {
      handleResponseErrors(err, 'UNLIKE_POST_ALERT')
    });
};

// @route POST 201 /api/posts/comments/:id
// Add comment to a post
export const addCommentToPost = (postId, comment) => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();
  const body = JSON.stringify({ comment });
  axios.post(`/api/posts/comments/${postId}`, body, configHeaders)
    .then(({ data }) => {
      dispatch({
        type: ADD_COMMENT_TO_POST,
        payload: data.data
      });
      dispatch(setAlert(data.message, 'ADD_COMMENT_SUCCESS'));
      dispatch({type: LOADED })
    })
    .catch(err => {
      handleResponseErrors(err, 'ADD_COMMENT_ALERT')

    });
};

// @route PUT 200 /api/posts:/post_id/comments/:comment_id
// Remove comment to a post
export const removePostComment = (postId, commentId ) => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();
  const uri = `/api/posts/${postId}/comments/${commentId}`;
  axios.put(uri, {}, configHeaders)
    .then(({ data }) => {
      dispatch({
        type: REMOVE_POST_COMMENT,
        payload: data.data
      });
      dispatch(setAlert(data.message, 'REMOVE_COMMENT_SUCCESS'));
      dispatch({type: LOADED });
    })
    .catch(err => {
      handleResponseErrors(err, 'REMOVE_COMMENT_ALERT')

    });
};


// Delete a Post by Id
export const deletePostById = id => dispatch => {
  dispatch({type: LOADING })
  const configHeaders = getConfigHeaders();  
  axios.delete(`/api/posts/${ id }`, configHeaders)
    .then(({ data }) => {
      dispatch({
        type: POST_DELETED,
        payload: data
      });
      dispatch(setAlert(data.message, 'DELETE_POST_ALERT'));
      dispatch({type: LOADED })
    })
    .catch(err => {
      handleResponseErrors(err, 'DELETE_POST_ALERT')
    });
};
