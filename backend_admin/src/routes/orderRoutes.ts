import express from "express";
import { Request, Response } from "express";
import { PrismaClient, order_status } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// create an order
router.post("/create-order", async (req: Request, res: Response): Promise<any> => {
  try {
	const { userId, totalAmount } = req.body;

	const order = await prisma.order.create({
	  data: { userId, totalAmount, status: order_status.PENDING, },
	});

	res.json({ message: "Order created successfully", order });
  } catch (error) {
	console.error("Error creating order:", error);
	res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch order by id
router.get("/order/:id", async (req: Request, res: Response): Promise<any> => {
  try {
	const { id } = req.params;
	const order = await prisma.order.findUnique({
	  where: { id: parseInt(id, 10) },
	});
	if (!order) {
	  return res.status(404).json({ error: "Order not found" });
	}
	console.log("Order:", order);
	res.json({ order });
  } catch (error) {
	console.error("Error fetching order:", error);
	res.status(500).json({ error: "Internal Server Error" });
	  }
});

export default router;