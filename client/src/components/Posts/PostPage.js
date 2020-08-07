import React, { Fragment } from 'react';
import PostFeeds from './PostFeeds';
import AuthContainer from '../AuthContainer';
import Alert from '../Alert';
const PostPage = () => {
  return ( 
    <AuthContainer>
      <Alert origin='LIKE_POST_SUCCESS' />
      <Alert origin='LIKE_POST_ALERT' />
      <Alert origin='UNLIKE_POST_SUCCESS' />
      <Alert origin='UNLIKE_POST_ALERT' />
      <Fragment>
        <PostFeeds />
      </Fragment>
    </AuthContainer>
   );
}
 
export default PostPage;