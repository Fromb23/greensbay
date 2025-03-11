import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add product to wishlist
export const addToWishlist = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, productId } = req.body;
    console.log(req.body);

    const wishlistItem = await prisma.wishlist.create({
      data: { userId, productId },
    });

    res.json({ success: true, wishlistItem });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req: Request, res: Response): Promise<any> => {
  try {
    const productId = parseInt(req.params.productId, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid userId or productId" });
    }

    await prisma.wishlist.deleteMany({
      where: { productId },
    });

    res.json({ success: true, message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get user's wishlist (Optional)
export const getWishlist = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: { product: true },
    });

    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};