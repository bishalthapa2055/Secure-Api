import { Request , Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { User } from "../../model/user";





const getOneUser = async(req : Request , res : Response) =>{
    try {

        const {id }  = req.params;
        if(!id){
            throw new BadRequestError("Id is needed")
        }
        const user= await User.findById(id);
        if(!user){
            throw new BadRequestError("User not available")
        }
        res.status(200).json({status : true , data : user})

    }catch(e){
        res.status(400).json({status : false , Error : (e as any).message ? (e as any).message : "Failed to get User"})
    }
}

export {getOneUser as getOneUserHandler}