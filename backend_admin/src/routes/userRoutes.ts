import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Create a new user
router.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  try {
	if (!firstName || !lastName || !email || !password) {
	  return res.status(400).json({ message: 'All fields are required' });
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.users.create({
	  data: {
		firstname: firstName,
		lastname: lastName,
		email,
		password: hashedPassword,
	  },
	});
	res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
	if (error instanceof Error) {
	  return res.status(400).json({ message: error.message });
	}
	return res.status(400).json({ message: 'Something went wrong' });
  }  
});

export default router;