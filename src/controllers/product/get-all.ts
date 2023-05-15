import { Request, Response } from "express";
import { Product } from "../../model/product";
import { BadRequestError } from "../../common/errors/bad-request-error";
import { User } from "../../model/user";
import { ApiFeatures } from "../../utils/api-service";

const getAllProduct = async (req: Request, res: Response) => {
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
              email: {
                $regex: searchTerm,
                $options: "xi",
              },
              role: "user",
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
      features = new ApiFeatures(
        User.find({
          role: "student",
        }),
        req.query
      )
        .filter()
        .sort()
        .limitFields();

      // Geting Doc out of that feature
      let doc = await features.query;

      const responseData = doc.map((item: any) => {
        console.log(item);
        return {
          id: item._id,
          email: item.email,
          name: item.name,
          role: item.role,
        };
      });

      res.status(200).json({
        results: doc.length,
        total: documentCount,
        data: responseData,
      });
    }
  } catch (error) {
    throw new BadRequestError(
      (error as any).message
        ? (error as any).message
        : "Failed to get students. Debug backend!"
    );
  }
};

export { getAllProduct as getAllProductHandler };
