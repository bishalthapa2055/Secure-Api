import { Request , Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { Payment } from "../../model/payment";

const getOnePayment = async(req : Request , res : Response) =>{
    try {
        const {id} = req.params ;
        if(id){
            throw new BadRequestError("Id is required field");
        }

        const response = await Payment.findById(id);
        if(!response){
            throw new BadRequestError("Unable to find payment for provided id/user")
        }
        res.status(200).json({status : true  , data : response})
    } catch (error) {
        res.status(400).json({status : false , Error : (error as any).message ?( error   as any).message : "Failed to get Payment"})
    }
}

export {getOnePayment as getOnePaymentHandler}