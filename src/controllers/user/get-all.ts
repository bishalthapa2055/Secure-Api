import { Request , Response } from "express";
import { User } from "../../model/user";
import { ApiFeatures } from "../../utils/api-service";

const getAllUsers = async(req : Request, res :Response) =>{
    try {
        let documentCount = await User.estimatedDocumentCount();

        const searchTerm = req.query.searchTerm as string | undefined;
    
        const user = req.query.user as string | undefined;
    
        let features: ApiFeatures;
    
        if (searchTerm) {

          features = new ApiFeatures(
            User.find({
              $and: [
                {
                  name: {
                    $regex: searchTerm,
                    $options: "xi",
                  },
                },
              ],
            }),
            req.query
          )
            .filter()
            .sort()
            .limitFields()
            .paginate();
        } else {
          features = new ApiFeatures(User.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
    
          // Geting Doc out of that feature
          let doc = await features.query;
    
          const responseData = doc.map((item: any) => {
            // console.log(item);
            return {
              id: item._id,
              name: item.name,
              email :item.email,
              role : item.role,
              photoUrl : item.photoUrl,
              createdAt: item.createdAt,
              updatedAt : item.updatedAt
            };
          });
    
          res.status(200).json({
            results: doc.length,
            total: documentCount,
            data: responseData,
          });
        }
    } catch (error) {
        res.status(400).json({status : false , message :(error as any).message ? (error as any).message : "Failed to get users"})
    }
}



export {getAllUsers as getAllUsersHandler}