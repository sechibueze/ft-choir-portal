const { validationResult } = require("express-validator");
const Member = require("../models/Member");
const Post = require("../models/Post");

/**** CREATE post  */
const createPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array().map((e) => e.msg),
    });
  }

  // Passed validations
  const { title, content } = req.body;
  const memberId = req.currentMember.memberId;
  console.log("o", req.currentMember);
  Member.findOne({ _id: memberId })
    .select("-password")
    .then((member) => {
      let newPost = new Post({
        member: memberId,
        image: member.imageUrl,
        title,
        content,
      });

      newPost.save((err) => {
        if (err)
          return res.status(500).json({
            status: false,
            message: "Internal Server Error:: failed to save new Post",
          });

        // New Post saved
        return res.status(201).json({
          status: true,
          message: "New Post created",
          data: newPost,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error:: failed to find user for post",
      });
    });
};

/**** Get All Posts */
const getAllPosts = (req, res) => {
  // Already authenticated with token
  let filter = {};
  const { id, count } = req.query;
  let query = Post.find(filter).sort({ createdAt: -1 });
  if (id) query = Post.findOne({ _id: id });
  if (count) query = query.limit(+count);

  query
    .exec()
    .then((posts) => {
      // Posts exists at least []
      return res.status(200).json({
        status: true,
        message: "All posts",
        data: posts,
      });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          status: false,
          message: "Internal Server Error:: failed to get all posts",
        });
    });
};

/**** Get Post by Post Id */
const getPostById = (req, res) => {
  // Already authenticated with token
  const filter = { _id: req.params.postId };
  Post.findOne(filter)
    .populate({
      path: "comments.member",
      select: ["name"],
      model: Member,
    })
    .then((post) => {
      if (!post)
        return res.status(401).json({
          status: false,
          errors: ["Internal Server Error:: No Post is available"],
        });

      // Posts exists at least []
      return res.status(200).json({
        status: true,
        message: "Found Post",
        data: post,
      });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          status: false,
          errors: ["Internal Server Error:: failed to get all posts"],
        });
    });
};

/**** Update Post by Post Id */
const updatePostById = (req, res) => {
  // Already authenticated with token
  console.log("req body ", req.body);

  const filter = { _id: req.body._id };
  Post.findOne(filter)
    .then((post) => {
      if (!post)
        return res.status(401).json({
          status: false,
          message: "Internal Server Error:: No Post is available",
        });

      const { title, content } = req.body;
      if (title) post.title = title;
      if (content) post.content = content;

      post.save((err) => {
        if (err)
          return res.status(500).json({
            status: false,
            errors: ["Internal Server Error:: failed to get all posts"],
          });
        // Posts exists at least []
        return res.status(200).json({
          status: true,
          message: "Post updated",
          data: post,
        });
      });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          status: false,
          errors: ["Internal Server Error:: failed to get all posts"],
        });
    });
};

/*** User can delete his post */
const deletePosts = (req, res) => {
  // const currentUserId = req.currentUserId;
  const memberId = req.currentMember.memberId;
  const { posts } = req.body;

  // Passed Post ID format checks
  Post.find({ _id: { $in: posts } })
    .then((post) => {
      // if (post.length > 0) return res.status(401).json({ status: false, message: 'Internal Server Error:: No Post is available' });

      // Check that post is deleted by owner
      // if (post.member.toString() !== memberId) {

      //   return res.status(401).json({
      //     status: false,
      //     errors: ['Unauthorized: You can only delete your posts']
      //   });
      // }
      // Found post, by the owner, DELETE it
      if (post.length > 0) post.map(async (p) => await p.remove());

      // Posts deleted
      return res.status(200).json({
        status: true,
        message: "Post deleted",
        data: Date.now(),
      });
    })
    .then()
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error:: failed to delete post",
      });
    });
};

/****** Like a Post */
const likePost = (req, res) => {
  // User has been authenticated
  // const currentUserId = req.currentUserId;
  const memberId = req.currentMember.memberId;
  const postId = req.params.postId;

  Post.findOne({ _id: postId })
    .then((post) => {
      // User can only like post once
      const hasLikedPost = post.likes.some((like) => {
        return like.member.toString() === memberId;
      });

      if (hasLikedPost) {
        return res.status(400).json({
          status: false,
          error: "You can only like a post once",
        });
      }

      // User has not liked post before
      // Now like it
      post.likes.unshift({ member: memberId });
      // Save the post to update changes
      post.save((err) => {
        if (err)
          return res.status(500).json({
            status: false,
            error: "Internal Server Error:: failed to update liked post",
          });

        // Post saved successfully
        return res.status(200).json({
          status: true,
          message: "Your like to post has been updated successfully",
          data: post,
        });
      });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          status: false,
          error: "Internal Server Error:: failed to find post to like",
        });
    });
};
/****** Unlike a Post if you have liked before*/
const unlikePost = (req, res) => {
  // User has been authenticated
  // const currentUserId = req.currentUserId;
  const memberId = req.currentMember.memberId;
  const postId = req.params.postId;

  console.log("User has liked post", memberId, postId);
  Post.findOne({ _id: postId })
    .then((post) => {
      // User can only unlike post he had liked
      // Confirm that user had liked the post
      const hasLikedPost = post.likes.some((like) => {
        return like.member.toString() === memberId;
      });
      if (!hasLikedPost) {
        return res.status(400).json({
          status: false,
          error: "You can only unlike a post that you liked",
        });
      }

      // User has  liked post before
      // Now unlike it
      post.likes = post.likes.filter(
        (like) => like.member.toString() !== memberId
      );
      // console.log('Post likes', post.likes)
      // Save the post to update changes
      post.save((err) => {
        if (err)
          return res.status(500).json({
            status: false,
            error: "Internal Server Error:: failed to update liked post",
          });

        // Post saved successfully
        return res.status(200).json({
          status: true,
          message: "Your unlike to post has been updated successfully",
          data: post,
        });
      });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          status: false,
          error: "Internal Server Error:: failed to find post to like",
        });
    });
};
/****** Comment on a post */
const addComment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errors.array().map((errObj) => errObj.msg),
    });
  }

  // Request passed all validations
  // const currentUserId = req.currentUserId;
  const memberId = req.currentMember.memberId;
  const postId = req.params.postId;
  const { comment } = req.body;
  // Get Users avartar
  let newComment = { member: memberId, comment };
  Member.findOne({ _id: memberId })
    .select("-password")
    .then((member) => {
      newComment.avatar = member.avatar;
      Post.findOne({ _id: postId })
        .then((post) => {
          if (!post)
            return res.status(500).json({
              status: false,
              errors: "Internal Server Error:: No Post for comment",
            });

          // Post found, Oya comment
          post.comments.unshift(newComment);

          // Save to update the post
          post.save((err) => {
            if (err)
              return res.status(500).json({
                status: false,
                errors:
                  "Internal Server Error:: failed to update post after comment",
              });

            // Post saved
            return res.status(201).json({
              status: true,
              message: "Comment added successfuly",
              data: post,
            });
          });
        })
        .catch((err) => {
          if (err)
            return res.status(500).json({
              status: false,
              errors: "Internal Server Error:: failed to find post for comment",
            });
        });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          status: false,
          errors: "Internal Server Error:: failed to find user for commenting",
        });
    });
};

/****** Delete your Comment on a post */
const deleteComment = (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  // const currentUserId = req.currentUserId;
  const memberId = req.currentMember.memberId;
  const filter = { _id: postId };

  Post.findOne(filter)
    .then((post) => {
      if (!post)
        return res.status(500).json({
          status: false,
          errors: "Internal Server Error:: No Post for comment deleting",
        });

      post.comments = post.comments.filter(
        (comment) => comment._id.toString() !== commentId
      );

      // Save to update the post
      post.save((err) => {
        if (err)
          return res.status(500).json({
            status: false,
            errors:
              "Internal Server Error:: failed to update post after comment delete",
          });

        // Post saved
        return res.status(200).json({
          status: true,
          message: "Comment deleted successfuly",
          data: post,
        });
      });
    })
    .catch((err) => {
      if (err)
        return res.status(500).json({
          status: false,
          errors:
            "Internal Server Error:: failed to find post for comment removal",
        });
    });
};

module.exports = {
  createPost,
  getAllPosts,
  updatePostById,
  getPostById,
  deletePosts,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
};
