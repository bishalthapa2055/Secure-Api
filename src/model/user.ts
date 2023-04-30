import mongoose from "mongoose";
import { Password } from "../services/password";

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

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.methods.correctPassword = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  return await Password.compare(storedPassword, suppliedPassword);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
