import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import prisma from '../libs/prismadb'

export const login = async (req: Request, res: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid Email' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid login' });
    }

    return res.status(200).json({ message: 'login suceess!' })
  } catch (error) {

    console.log(error);
    return res.sendStatus(400);
  }
};