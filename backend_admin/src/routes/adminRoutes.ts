import express, { Request, Response } from "express";
import pool from "../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

interface Admin {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at?: Date;
}

// login admin
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Query the admin user by email
    const [admins]: any = await pool.execute("SELECT * FROM admins WHERE email = ?", [email]);

    // If no admin found, return invalid credentials
    if (!admins || admins.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const admin = admins[0];

    // Check password hash
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    // Successful login response (token-based authentication should be added here)
    return res.status(200).json({ message: "Login successful", adminId: admin.id, token: token, username: admin.username });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
  }
});

// Create Admin Route
router.post("/create-admin", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const [result]: any = await pool.execute(
      "INSERT INTO admins (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    res.status(201).json({ message: "Admin created successfully!", adminId: result.insertId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error", details: (error as Error).message });
  }
});

export default router;