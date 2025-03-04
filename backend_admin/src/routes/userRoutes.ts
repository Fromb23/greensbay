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

// Login user
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
	if (!email || !password) {
	  return res.status(400).json({ message: 'All fields are required' });
	}
	const user = await prisma.users.findUnique({
	  where: {
		email,
	  },
	});
	if (!user) {
	  return res.status(400).json({ message: 'User not registered' });
	}
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
	  return res.status(400).json({ message: 'Incorrect password' });
	}
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
	  expiresIn: '1d',
	});
	res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
	if (error instanceof Error) {
	  return res.status(400).json({ message: error.message });
	}
	return res.status(400).json({ message: 'Something went wrong' });
  }
});

export default router;