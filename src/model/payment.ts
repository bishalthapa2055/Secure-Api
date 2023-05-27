import mongoose ,{ObjectId} from "mongoose";

export enum PaymentOptEnum{
    cash="cash",
    esewa="esewa",
    khalti="khalti",
    mbanking="mbanking"
}
export interface PaymentAttrs{
    userId:ObjectId;
    productId:ObjectId;
    orderId:ObjectId;
    payment_via?:PaymentOptEnum;
    price:number;
}

interface PaymentModel extends mongoose.Model<PaymentDoc>{
    build(attr : PaymentAttrs) : PaymentDoc;
}

export interface PaymentDoc extends mongoose.Document , PaymentAttrs{
    userId : ObjectId;
    productId : ObjectId;
    orderId : ObjectId;
    payment_via ?: PaymentOptEnum;
    price : number ;
    createdAt : Date;
    updatedAt:Date;
}

const paymentSchema = new mongoose.Schema<PaymentDoc>(
    {
        userId:{
            type: mongoose.Types.ObjectId,
            ref:"User"
        },
        productId:{
            type:mongoose.Types.ObjectId,
            ref:"Product"
        },
        orderId:{
            type :mongoose.Types.ObjectId,
            ref:"Order"
        },
        payment_via:{
            type:String,
            enum:PaymentOptEnum,
            default:PaymentOptEnum.cash
        },
        price:{
            type:Number,
            required:true
        }
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
)


paymentSchema.statics.build = (attrs : PaymentAttrs) =>{
    return new Payment(attrs)
}

const Payment = mongoose.model<PaymentDoc , PaymentModel>("Payment" , paymentSchema)

export {Payment}