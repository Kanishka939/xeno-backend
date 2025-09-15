import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Signup
export const signup = async (req, res) => {
  const { name, email, password, tenantName, tenantSlug } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Use transaction to create tenant + user
    const result = await prisma.$transaction(async (prismaTx) => {
      const tenant = await prismaTx.tenant.create({
        data: { name: tenantName, slug: tenantSlug },
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prismaTx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          tenantId: tenant.id,
        },
      });

      return user;
    });

    // Generate JWT
    const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ user: result, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
