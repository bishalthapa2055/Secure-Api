import { Request , Response } from "express";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { User } from "../../model/user";

const updateUser =async (req : Request  , res :Response) => {
     
    try {
        const {name , password , phone , photoUrl , dateofbirth, citizenshipNo , temporaryLocation , permanentLocation}= req.body;
        const {id} = req.params ;
        if(!id){
            throw new BadRequestError("Id is required")
        }

        const isExistsUser = await User.findById(id);
        if(!isExistsUser){
            throw new BadRequestError("User is not available")
        }

        isExistsUser.name =  name || isExistsUser.name;
        isExistsUser.password =  password || isExistsUser.password;
        isExistsUser.phone =  phone || isExistsUser.phone;
        isExistsUser.photoUrl =  photoUrl || isExistsUser.photoUrl;
        isExistsUser.dateofbirth =  dateofbirth || isExistsUser.dateofbirth;
        isExistsUser.citizenshipNo =  citizenshipNo || isExistsUser.citizenshipNo;
        isExistsUser.temporaryLocation =  temporaryLocation || isExistsUser.temporaryLocation;
        isExistsUser.permanentLocation =  permanentLocation || isExistsUser.permanentLocation;

        const updatedUser = await isExistsUser.save();
        if(!updateUser ){
            throw new BadRequestError("Unable to update user")
        }
        res.status(200).json({status : true , message :"User Updated Sucessfully" , data : updatedUser})
    } catch (error) {
        res.status(400).json({status : false , Error : (error as any).message ? (error as any).message  : "Debug backend"})
    }
}

export {updateUser as updateUserHandler }