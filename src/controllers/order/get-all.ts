import { Request , Response } from "express";
import { Order } from "../../model/order";
import { ApiFeatures } from "../../utils/api-service";
import { User } from "../../model/user";
import { Product } from "../../model/product";


const getAllOrders = async(req : Request , res : Response) =>{
    try {
        let documentCount = await Order.estimatedDocumentCount();

        const searchTerm = req.query.searchTerm as string | undefined;
    
        const product = req.query.user as string | undefined;
    
        let features: ApiFeatures;
    
        if (searchTerm) {
          features = new ApiFeatures(
            Order.find({
              $and: [
                {
                  name: {
                    $regex: searchTerm,
                    $options: "xi",
                  },
                },
              ],
            }).sort({ createdAt: -1 }),
            req.query
          )
            .filter()
            .sort()
            .limitFields()
            .paginate();
        } else {
          features = new ApiFeatures(Order.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
    
          // Geting Doc out of that feature
          let doc = await features.query;
    
          const responseData = await Promise.all(
          
          doc.map(async(item: any) => {
            // console.log(item);
            const user = await User.findById(item.userId);
            const product = await Product.findById(item.productId)
            return {
              id: item._id,
              name: item.orderName,
              quantity : item.orderedQuantity,
              user: {
                id: user!._id,
                name: user!.name,
                email: user!.email,
              },
              product : {
                id:product!.id,
                name : product!.name,
                price : product!.originalPrice
              }
            };
          })
         )
    
          res.status(200).json({
            results: doc.length,
            total: documentCount,
            data: responseData,
          });
        }
    } catch (error) {
        res.status(400).json({status : false , Error : (error as any).message ? (error as any).message : "Failed to get . Debug Backend !!"})
    }

}


export {getAllOrders as getAllOrdersHandlers}