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
router.get("/order/:userId", async (req: Request, res: Response): Promise<any> => {
	try {
	  const { userId } = req.params;
	  console.log("userId:", userId);
  
	  // Fetch all orders for the given user
	  const orders = await prisma.order.findMany({
		where: { userId: parseInt(userId, 10) },
		orderBy: { createdAt: "desc" },
	  });
  
	  if (!orders.length) {
		return res.status(404).json({ error: "No orders found for this user" });
	  }
  
	  console.log("Orders:", orders);
	  res.json({ orders });
  
	} catch (error) {
	  console.error("Error fetching orders:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  });
  
// fetch all orders
router.get("/fetch-all", async (req: Request, res: Response): Promise<any> => {
	  try {
	const orders = await prisma.order.findMany();
	console.log("Orders:", orders);
	res.json({ orders });
  } catch (error) {
	console.error("Error fetching orders:", error);
	res.status(500).json({ error: "Internal Server Error" });
  }
});

// update order status
router.put("/update-status/:id", async (req: Request, res: Response): Promise<any> => {
  try {
	const { id } = req.params;
	const { status } = req.body;

	const order = await prisma.order.update({
	  where: { id: parseInt(id, 10) },
	  data: { status },
	});

	res.json({ message: "Order status updated successfully", order });
  } catch (error) {
	console.error("Error updating order status:", error);
	res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;