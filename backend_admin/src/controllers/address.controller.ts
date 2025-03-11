import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { userId, address, city, country } = req.body;

    const existingAddress = await prisma.customerAddress.findUnique({
      where: { userId: Number(userId) },
    });

    let updatedAddress;
    if (existingAddress) {
      updatedAddress = await prisma.customerAddress.update({
        where: { userId: Number(userId) },
        data: { address, city, country },
      });
    } else {
      updatedAddress = await prisma.customerAddress.create({
        data: {
          userId: Number(userId),
          address: address || "N/A",
          city: city || "Default City",
          country: country || "Default Country",
        },
      });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error("Failed to update/create address", error);
    res.status(500).json({ error: "Failed to update/create address" });
  }
};

export const deleteAddress = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.body;
    await prisma.customerAddress.delete({
      where: { id: Number(userId), userId: Number(userId) },
    });
    res.json({ message: "Address removed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove address" });
  }
};

export const getAddress = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;

    const address = await prisma.customerAddress.findUnique({
      where: { userId: Number(userId) },
    });

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: "Failed to get address" });
  }
};

export const getDelivery = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;

    const delivery = await prisma.deliveryaddress.findFirst({
      where: { userId: Number(userId) },
    });

    if (!delivery) {
      return res.status(404).json({ message: "No delivery address found" });
    }

    res.status(200).json(delivery);
  } catch (error) {
    console.error("Failed to get delivery address", error);
    res.status(500).json({ error: "Failed to get delivery address" });
  }
};


export const updateDelivery = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, address, city, state, zipCode, phone } = req.body;

    const existingDelivery = await prisma.deliveryaddress.findFirst({
      where: { userId: Number(userId) },
    });

    if (existingDelivery) {
      const updatedDelivery = await prisma.deliveryaddress.update({
        where: { userId: Number(userId) },
        data: { address, city, state, zipCode, phone },
      });

      return res.status(200).json(updatedDelivery);
    }

    const newDelivery = await prisma.deliveryaddress.create({
      data: {
        userId: Number(userId),
        address,
        city,
        state,
        zipCode,
        phone,
      },
    });

    res.status(201).json(newDelivery);
  } catch (error) {
    console.error("Failed to update/create delivery address", error);
    res.status(500).json({ error: "Failed to update/create delivery address" });
  }
};