import { Request, Response } from "express";
import { Product } from "../../model/product";
import { BadRequestError } from "../../common/errors/bad-request-error";

import { ApiFeatures } from "../../utils/api-service";

const getAllProduct = async (req: Request, res: Response) => {
  try {
    let documentCount = await Product.estimatedDocumentCount();

    const searchTerm = req.query.searchTerm as string | undefined;

    const product = req.query.user as string | undefined;

    let features: ApiFeatures;

    if (searchTerm) {
      features = new ApiFeatures(
        Product.find({
          $and: [
            {
              name: {
                $regex: searchTerm,
                $options: "xi",
              },
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
      features = new ApiFeatures(Product.find(), req.query)
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
          originalPrice: item.originalPrice,
          discountedPrice: item.discountedPrice,
          discountedPercentage: item.discountedPercentage,
          subDescription: item.subDescription,
          mainDescription: item.mainDescription,
          netTotal: item.netTotal,
          productUrl: item.productUrl,
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
