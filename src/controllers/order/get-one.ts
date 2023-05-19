import { Request , Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Order } from "../../model/order";

const getOneOrder =async (req:Request , res : Response) => {
    try{

        const {id} = req.params;
        if(!id){
            throw new BadRequestError("Id is required")
        }

        const isExistsOrder = await Order.findById(id);
        if(!isExistsOrder){
            throw new BadRequestError("Order Doesnot exists ...")
        }
        const response = await Order.findById(id).populate("userId" ,"name email").populate("productId" ,"name")
        res.status(200).json({status : true , data : response})

    }catch(e){
        res.status(400).json({status : false , Error : (e as any).message ? ( e as any).message : "Failed to get . Debug Backend !!"})
    }
}

export {getOneOrder as getOneOrderHandler}