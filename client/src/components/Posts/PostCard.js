import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { likePostByPostId, unlikePostByPostId } from '../../_actions/postActions';
const PostCard = ({ 
  post,
  likePostByPostId,
  unlikePostByPostId
 }) => {
  
  const { _id, title, content, comments, likes } = post;
  return (
    <Fragment>
      
      <div className="post-card py-2">
        {/* <div className="post-creator-image p-1">
          <img src="https://image.com.about-img-369x247.png" 
          alt='post-1234'
           style={{width: '90px', height: '90px', borderRadius: '50%'}} />
        </div> */}
        <div className="post-content p-1">
          <p className="text text-primary"> { title && title } </p>
          <article className="post-content my-1">
            { content && content }
          </article>
          <div className="post-stats my-1">
            <span title='Message Acknowledged' onClick={() => likePostByPostId(_id)} className="px-1 fa fa-thumbs-up">{likes.length } </span>
            <span className="mx-1 fa fa-thumbs-down" onClick={() => unlikePostByPostId(_id)}></span>
            {/* <span title='Message comments' className="px-1 mx-1  fa fa-comment-o"> {`  ${comments.length}` }</span> */}
            {/* <Link to={`/posts/${_id}`} className="btn btn-primary post-discussion-btn">Discussion</Link> */}
          </div>
        </div>
      </div>

    </Fragment>
  );
}
 
PostCard.propTypes = {
  likePostByPostId: PropTypes.func.isRequired,
  unlikePostByPostId: PropTypes.func.isRequired
};
//  const mapStateToProps = state => ({
//    loading: state.auth.loading,
//    postItems: state.posts.postItems
//  });
export default connect(null, { likePostByPostId, unlikePostByPostId })(PostCard);
