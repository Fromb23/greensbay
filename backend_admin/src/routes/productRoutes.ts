import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Fetch all products
router.get("/fetch-products", async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany({
      include: {
        category: { select: { name: true } },
      }
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a single product
router.get("/fetch-product/:id", async (req: Request, res: Response) => {
  try {
    const product = await prisma.products.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product be:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a product
router.post("/create-product", async (req: Request, res: Response) => {
  try {
    const { name, image, units_left, stock, discount_price, actual_price, category } = req.body;

    const product = await prisma.products.create({
      data: { name, image, units_left, stock, discount_price, actual_price, category },
    });

    res.json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product
router.delete("/remove-product/:id", async (req: Request, res: Response) => {
  try {
    await prisma.products.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch categories
router.get("/fetch-categories", async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;