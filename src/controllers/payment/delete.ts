import { Request , Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Payment } from "../../model/payment";


const deletPayment = async(req :Request , res : Response) =>{
    try{
    const {id } = req.params;
    if(!id){
        throw new BadRequestError("Payment Id is required")
    }

    const isExists = await Payment.findById(id);
    if(!isExists){
        throw new BadRequestError("Payment Doesnot exists")
    }

    const response = await Payment.findByIdAndRemove(id);
    if(!response){
        throw new BadRequestError("failed to delete Payment")
    }

    res.status(200).json({status : true  , message :`${isExists.id} is sucessfully deleted` , data : response})
    }
    catch(error){
        res.status(400).json({status : false , Error : (error as any).message ? (error as any).message : "Failed to delete" })
    }
}



export {deletPayment as deletPaymentHandler}