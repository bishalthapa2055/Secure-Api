import { Request , Response } from "express";
import { Payment } from "../../model/payment";
import { BadRequestError } from "../../common/errors/bad-request-error";


const getAllPayment = async(req : Request , res : Response) =>{
    try{

        const response = await  Payment.find();
        if(!response){
            throw new BadRequestError("Unable to find the payment")
        }
        res.status(200).json({status : true , data : response})

    }catch(e){
        res.status(400).json({status : false , Error : ( e as any).message ? (e as any).message : "Failed to get payments"})
    }
}


export {getAllPayment as getAllPaymentHandler}