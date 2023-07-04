import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { PostStatus } from "../shared/constants.js";

let userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: PostStatus,
      default: PostStatus.active,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
export const postModel = mongoose.model("Post", userSchema);
