import { Request , Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { User } from "../../model/user";


const deleteUser =async (req : Request , res :Response) => {

    
    try {
        const {id} = req.params;
        if(!id) {
            throw new BadRequestError("Id is required");
        }
        const isExists = await User.findById(id);
        if(!isExists){
            throw new BadRequestError("User Does not exists")
        }

        const result = await User.findByIdAndRemove(id);
        if(!result){
            throw new BadRequestError("Error Occured")
        }
        res.status(200).json({status : true , data :result})
        } catch (error) {
        res.status(400).json({status : false , Error :(error as any).message ? (error as any).message : "Failed to delete User"})
    }
}

export{deleteUser as deleteUserHandler}