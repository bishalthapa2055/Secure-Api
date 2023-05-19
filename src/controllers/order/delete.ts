import {Request , Response} from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Order } from "../../model/order";


const deleteOrder  = async (req:Request , res : Response) => {
    try {

        const { id}  = req.params ;
        if(!id){
            throw new BadRequestError("OrderId is required")
        }
        const isExists = await Order.findById(id);
        console.log(isExists)
        if(!isExists){
            throw new BadRequestError("Order Unavailable")
        }

        const deletedData = await Order.findByIdAndRemove(id);
        if(!deletedData){
            throw new BadRequestError("Failed to delete Order")
        }

        res.status(200).json({staus : true , data : deletedData})
    } catch (error) {
        res.status(400).json({status : false , Error : (error as any).message ? (error as any).message : "Failed to Delete . Debug Backend"})
    }
}


export {deleteOrder as deleteOrderHandler}