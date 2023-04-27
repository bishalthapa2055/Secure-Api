import mongoose from "mongoose";

export interface UserAttrs {
  email: string;
  password: string;
  name: string;
  photoUrl?: string;
  phone?: number;
  dateofbirth?: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document, UserAttrs {
  email: string;
  password: string;
  name: string;
  photoUrl?: string;
  phone?: number;
  dateofbirth?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://bitpointx.s3-ap-southeast-1.amazonaws.com/config/transparent_logo.png",
    },
    phone: {
      type: Number,
    },
    dateofbirth: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

userSchema.index({ "$**": "text" });

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
