import { Router } from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlist.controller";

const router = Router();

router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.get("/:userId", getWishlist);

export default router;
