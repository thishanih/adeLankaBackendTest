import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let userSchema = mongoose.Schema(
  {
    commentNote: {
      type: String,
      require: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Post",
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
export const commentsModel = mongoose.model("Comments", userSchema);
