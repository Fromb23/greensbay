import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

interface Admin {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
}

// Admin Login
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find the admin in the database
    const admin = await prisma.admins.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", adminId: admin.id, token, username: admin.username });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
  }
});

// Create Admin
router.post("/create-admin", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin
    const admin = await prisma.admins.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "Admin created successfully!", adminId: admin.id });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error", details: (error as Error).message });
  }
});

export default router;