import { Request, Response } from "express";
import Review from "../models/Review";
import Product from "../models/Product";
import User from "../models/User";

interface CreateReviewRequestBody {
  user: any;
  productId: number;
  rating: number;
  comment?: string;
}

interface UpdateReviewRequestBody {
  user: any;
  rating?: number;
  comment?: string;
}

// GET /product/:productId/reviews
export const getReviewsByProduct: any = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await Review.findAll({
      where: { productId },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST /review
export const createReview: any = async (
  req: Request<{}, {}, CreateReviewRequestBody>,
  res: Response
) => {
  const { productId, rating, comment } = req.body;
  const userId = req.body.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user found in token" });
  }

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = await Review.create({
      productId,
      userId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// PUT /review/:reviewId
export const updateReview: any = async (
  req: Request<{ reviewId: string }, {}, UpdateReviewRequestBody>,
  res: Response
) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.body.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user found in token" });
  }

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own reviews" });
    }

    // Update review details
    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE /review/:reviewId
export const deleteReview: any = async (
  req: Request<{ reviewId: string }>,
  res: Response
) => {
  const { reviewId } = req.params;
  const userId = req.body.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user found in token" });
  }

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own reviews" });
    }

    await review.destroy();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
