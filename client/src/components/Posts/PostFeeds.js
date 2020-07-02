import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts }  from '../../_actions/postActions';
import PostCard from './PostCard';

import Loader from '../Loader';
const PostFeeds = ({loading, getAllPosts, postItems, postLiked }) => {
  
  useEffect(() => getAllPosts(), [postLiked]);
  if(loading && postItems.length === 0) return <Loader />
  return (

     
        <Fragment>
          <div className="post-wrapper">
            {postItems.length > 0 ? 
            postItems.map((post, index) => <PostCard post={post} key={index} />):(
              <h2> No Message yet</h2>
            )
            }
          </div>
        </Fragment>
 
   
  );
}
PostFeeds.propTypes = {
  getAllPosts: PropTypes.func.isRequired
};
 const mapStateToProps = state => ({
   loading: state.auth.loading,
   postItems: state.posts.postItems,
   postLiked: state.posts.postLiked
 });
export default connect(mapStateToProps, { getAllPosts })(PostFeeds);