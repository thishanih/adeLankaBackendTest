import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import { commentsModel } from "../models/comment.model.js";

import HttpError from "../shared/htttp.error.js";
import { addCommentValidation } from "../shared/validation/comment.validation.js";

// Add Post
export const addComment = async (commentData) => {
  const { error } = addCommentValidation(commentData);
  if (error) throw HttpError.badRequest(error.details[0].message);

  // check user
  const userExists = await userModel.findOne({ _id: commentData.user });
  if (!userExists) throw HttpError.badRequest("Invalid userID");

  // check post
  const postExists = await postModel.findOne({ _id: commentData.post });
  if (!postExists) throw HttpError.badRequest("Invalid PostId");

  const comment = new commentsModel({
    commentNote: commentData.commentNote,
    user: commentData.user,
    post: commentData.post,
  });

  const newComment = await comment.save();
  return newComment;
};

//////////////////////////////////////// Display Product Comment //////////////////////////
export const displayPostComment = async (postId) => {
  const comment = await commentsModel.find({ post: postId }).populate("user");
  if (!comment) throw HttpError.badRequest("Invalid PostId");

  return comment;
};
