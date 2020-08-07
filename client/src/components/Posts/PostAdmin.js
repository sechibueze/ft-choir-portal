import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { getAllPosts, deletePostById } from '../../_actions/postActions';
import CreatePost from './CreatePost';
// import ManagePostsCard from '../ManagePostsCard';
import Modal from '../Modal';
import AuthContainer from '../AuthContainer';
import Loader from '../Loader';
const PostAdmin = ({loading,  getAllPosts, postItems,  newPost, deletePostById, postDeleted }) => {
  const [newPostModal, setCreatePostModal] = useState(false);
  useEffect(() => {
    getAllPosts();
  }, [newPost, postDeleted]);

  const handleDeletePost = postId => {
    if (window.confirm('Irreversible! Are you sure ? ')) {
      deletePostById(postId)
    }
  };
  
  if(loading && postItems.length === 0) return <Loader />
  let postSize = postItems.length;
  return (
    
    <AuthContainer>
      <Alert origin='CREATE_POST_SUCCESS' type='success'/>
      <Alert origin='DELETE_POST_SUCCESS' />
      {
        newPostModal && (
          <Modal visible={newPostModal} closeModal={() => setCreatePostModal(false)}>
            <CreatePost closeModal={() => setCreatePostModal(false)}/>
          </Modal>
        )
      }
      <Fragment>
        <div className='dashboard-actions my-1'>
          <span className='btn btn-primary btn-sm my-2' onClick={() => setCreatePostModal(true)}> Create Post</span>

        </div>
          {
          postSize > 0 ? (
            <Fragment>
              <table className='table'>
                <thead>
                  <tr>
                    <td> S/N</td>
                    <td> Title </td>
                    <td> Message </td>
                    <td> Delete </td>
                  </tr>
                </thead>
                <tbody>
                  {
                    postItems.map((post, idx) => (
                      <tr>
                        <td> {++idx} </td>
                        <td> {post.title} </td>
                        <td> {post.content.slice(0, 10)} ... </td>
                        <td> <span className='fa fa-trash' onClick={() => handleDeletePost(post._id)}/>  </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </Fragment>
          ): 'No Posts yet'
        }
      </Fragment>
    </AuthContainer>
    
  );
}
PostAdmin.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired
};
 const mapaStateToProps = state => ({
  loading: state.auth.loading,
  postItems: state.posts.postItems,
  newPost: state.posts.newPost,
  postDeleted: state.posts.postDeleted
 });
export default connect(mapaStateToProps, { getAllPosts, deletePostById })(PostAdmin);