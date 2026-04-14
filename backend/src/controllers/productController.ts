import { Request, Response } from "express";
import prisma from "../config/db";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        variants: true,
        category: true,
      },
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        variants: true,
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Admin only (basic implementation without auth for now)
export const createProduct = async (req: Request, res: Response) => {
    try {
      const { title, description, price, isSale, isNew, gender, variants, images } = req.body;
      
      const product = await prisma.product.create({
        data: {
          title,
          description,
          price,
          isSale,
          isNew,
          gender,
          variants: {
            create: variants // Array of variant objects { size, color, stock, sku }
          },
          images: {
            create: images // Array of image objects { url }
          }
        },
        include: {
          variants: true,
          images: true
        }
      });
  
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  };
