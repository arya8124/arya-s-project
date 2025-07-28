import { Request, Response } from "express";
import Purchase from "../models/Purchase";
import Product from "../models/Product";
import User from "../models/User";

// Create a new purchase
export const createPurchase: any = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.body.user.id;

  try {
    // Fetch the product
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if stock is sufficient
    if (product.stock < quantity) {
      return res
        .status(400)
        .json({
          message: `Insufficient stock. Only ${product.stock} units available.`,
        });
    }

    // Reduce product stock
    product.stock -= quantity;
    await product.save();

    // Create the purchase record
    const purchase = await Purchase.create({
      userId,
      productId,
      quantity,
    });

    res.status(201).json({ message: "Purchase successful", purchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all purchases for a user
export const getUserPurchases: any = async (req: Request, res: Response) => {
  const userId = req.body.user.id;

  try {
    const purchases = await Purchase.findAll({
      where: { userId },
      include: [Product],
      order: [["createdAt", "DESC"]],
    });

    if (purchases.length === 0) {
      return res
        .status(404)
        .json({ message: "No purchases found for this user" });
    }

    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a specific purchase by ID
export const getPurchaseById: any = async (req: Request, res: Response) => {
  const { purchaseId } = req.params;

  try {
    const purchase = await Purchase.findByPk(purchaseId, {
      include: [Product, User],
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
