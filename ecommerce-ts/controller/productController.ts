import { Request, Response } from "express";
import Product from "../models/Product";
import Purchase from "../models/Purchase";
import { Op } from "sequelize";

interface CreateProductRequestBody {
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface PurchaseRequestBody {
  user: any;
  quantity: number;
}

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single product by id
export const getProductById: any = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get products with stock > 0
export const getAvailableProducts = async (req: Request, res: Response) => {
  try {
    const availableProducts = await Product.findAll({
      where: { stock: { [Op.gt]: 0 } }, // Get products where stock is greater than 0
    });

    res.status(200).json(availableProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get products with stock 
export const getUnavailableProducts = async (req: Request, res: Response) => {
  try {
    const unavailableProducts = await Product.findAll({
      where: { stock: 0 },
    });

    res.status(200).json(unavailableProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new product
export const createProduct = async (
  req: Request<{}, {}, CreateProductRequestBody>,
  res: Response
) => {
  const { name, description, price, stock } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST /products/:id/purchase
export const purchaseProduct: any = async (
  req: Request<{ id: any }, {}, PurchaseRequestBody>,
  res: Response
) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.body.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user found in token" });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock availability
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

    // Record the purchase
    const purchase = await Purchase.create({
      userId,
      productId: id,
      quantity,
    });

    res.status(201).json({ message: "Purchase successful", purchase });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
