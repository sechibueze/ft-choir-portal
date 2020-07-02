import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../../_actions/postActions';
const CreatePost = ({ createPost, closeModal, newPost }) => {

  const [postData, setPostData ] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    if(newPost !== null) return closeModal();
  }, [newPost]);

  const handleChange = ({ target }) => {
    setPostData({
      ...postData,
      [target.name]: target.value
    });
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    createPost(postData)
  }
  
  const { title, content } = postData;
  return (
    <Fragment>
      <div className="add-post">
        <p className="text text-primary">Say something today</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="form-control" name="title" onChange={handleChange} value={title} placeholder='Give this post a title'/>
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="7" cols="20"
            placeholder='Start typing...or paste your content'
            name='content'
            value={ content }
            required
            onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input className="btn btn-dark" type="submit" value="Post" />
          </div>
        </form>
      </div>
    </Fragment>
  );
}

 CreatePost.propTypes = {
   createPost: PropTypes.func.isRequired
 };
 const mapStateToProps = state => ({
   newPost: state.posts.newPost
 })
export default connect(mapStateToProps, { createPost })(CreatePost);