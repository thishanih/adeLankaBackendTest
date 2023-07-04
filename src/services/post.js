import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import HttpError from "../shared/htttp.error.js";
import { addPostValidation } from "../shared/validation/post.validation.js";


// Add Post
export const addPost = async (postData) => {
  const { error } = addPostValidation(postData);
  if (error) throw HttpError.badRequest(error.details[0].message);

  // check user already
  const userExists = await userModel.findOne({ _id: postData.user });
  if (!userExists) throw HttpError.badRequest("Invalid userID");

  const post = new postModel({
    title: postData.title,
    note: postData.note,
    user: postData.user,
  });

  const newPost = await post.save();
  return newPost;
};

//////////////////////////////////////// Display //////////////////////////
export const displayPost = async (request) => {
  const { page, per_page, search } = request;

  let query = {};

  if (search) {
    query.title = { $regex: search };
  }

  const options = {
    page: page,
    limit: per_page,
    populate: [
      {
        path: "user",
      },
    ],
    sort: {
      createdAt: -1,
    },
  };

  let posts = await postModel.paginate(query, options);
  return posts;
};
