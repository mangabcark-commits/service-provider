import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET || 'local-dev-secret-key';

  return jwt.sign({ id: user._id, email: user.email, name: user.name }, jwtSecret, {
    expiresIn: '7d'
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      city: city?.trim() || ''
    });

    return res.status(201).json({
      message: 'Registration successful',
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email, city: user.city }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({
      message: 'Login successful',
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email, city: user.city }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Profile fetch failed' });
  }
};
