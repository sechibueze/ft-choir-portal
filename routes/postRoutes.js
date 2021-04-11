const express = require("express");
const { check } = require("express-validator");
const checkMember = require("../middlewares/checkMember");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePosts,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = require("../controllers/postControllers");
const router = express.Router();
/***
 * @route POST 201 /api/posts
 * @description Create new post
 * @access private
 */
router.post(
  "/",
  checkMember,
  [check("content", "Post content is required").not().isEmpty()],
  createPost
);

/***
 * @route POST 200 /api/posts
 * @description update new post
 * @access private
 */
router.put("/", checkMember, updatePostById);

/***
 * @route GET 200 /api/posts
 * @description Get all posts
 * @access private
 */
router.get("/", getAllPosts);

/***
 * @route GET 200 /api/posts/:id
 * @description Get post by post ID
 * @access private
 */
router.get("/:postId", getPostById);

/***
 * @route GET 200 /api/posts/users
 * @description Get post by user id
 * @access private
 */
// router.get('/users/:id', checkAuth, getPostsByUserId);

/***
 * @route DELETE 200 /api/posts/:id
 * @description DELETE Post by post ID
 * @access private
 */
router.put("/delete", checkMember, deletePosts);

/***
 * @route PUT 200 /api/posts/like/:id
 * @description Liket a Post
 * @access private
 */
router.put("/like/:postId", checkMember, likePost);

/***
 * @route PUT 200 /api/posts/unlike/:id
 * @description Unlike a Post
 * @access private
 */
router.put("/unlike/:postId", checkMember, unlikePost);

/***
 * @route POST 201 /api/posts/comments/:id
 * @description Comment on  a Post
 * @access private
 */
router.post(
  "/comments/:commentId",
  checkMember,
  [check("comment", "Comment field is required").not().isEmpty()],
  addComment
);

/***
 * @route PUT 200 /api/posts:/post_id/comments/:comment_id
 * @description DELETE/REMOVE Comment on  a Post
 * @access private
 */
router.put("/:post_id/comments/:commentId", checkMember, deleteComment);

module.exports = router;
