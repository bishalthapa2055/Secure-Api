import mongoose, { mongo } from "mongoose";
import { Size } from "../common/types/product-sizes";

export interface ProductAttrs {
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountedPercentage: number;
  //   rating: number;
  subDescription: string;
  mainDescription: string;
  netTotal?: number;
  productUrl?: string;
  size?: Size;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document, ProductAttrs {
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountedPercentage: number;
  //   rating: number;
  subDescription: string;
  netTotal: number;
  mainDescription: string;
  productUrl?: string;
  size?: Size;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    discountedPercentage: {
      type: Number,
      required: true,
    },
    subDescription: {
      type: String,
    },
    mainDescription: {
      type: String,
    },
    netTotal: {
      type: Number,
    },
    productUrl: {
      type: String,
      default:
        "https://bitpointx.s3-ap-southeast-1.amazonaws.com/config/transparent_logo.png",
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
productSchema.index({ "$**": "text" });

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };
