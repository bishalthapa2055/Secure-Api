import mongoose, { ObjectId, mongo } from "mongoose";

export interface OrderAttrs {
  userId: ObjectId;
  productId: ObjectId;
  orderName: string;
  orderedQuantity: number;
}
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

export interface OrderDoc extends mongoose.Document, OrderAttrs {
  orderName: string;
  userId: ObjectId;
  productId: ObjectId;
  orderedQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<OrderDoc>(
  {
    orderName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    orderedQuantity: {
      type: Number,
      required: true,
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

orderSchema.index({ "$**": "text" });

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
