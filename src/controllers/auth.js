import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Business from '../models/Business.js';
import Creator from '../models/Creator.js';
import { isValidReqBody, isValid, validString, validateEmail } from '../utils/index.js';

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, userType } = req.body;

    if (!firstName || !lastName || !email || !password || !userType) {
      return res.status(400).json({ status: false, message: 'Please enter all mandatory fields' });
    }

    if (!isValidReqBody(req.body) || !isValid(firstName) || !validString(firstName) || !validateEmail(email)) {
      return res.status(400).json({ status: false, message: 'Invalid input' });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const userDetails = { firstName, lastName, email, password: hashedPass, location, userType };

    console.log(userDetails)
    let user;
    if (userType === 'creator') {
      user = await Creator.create(userDetails);
    } else if (userType === 'business') {
      user = await Business.create(userDetails);
    } else {
      return res.status(400).json({ status: false, message: 'Invalid user type' });
    }

    res.status(201).json({ status: true, data: user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType || !isValidReqBody(req.body) || !validateEmail(email)) {
      return res.status(400).json({ status: false, message: 'Invalid input' });
    }

    let user;
    if (userType === 'creator') {
      user = await Creator.findOne({ email });
    } else if (userType === 'business') {
      user = await Business.findOne({ email });
    } else {
      return res.status(400).json({ status: false, message: 'Invalid user type' });
    }

    if (!user) return res.status(400).json({ status: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, message: 'Incorrect password' });

    const token = jwt.sign({ userId: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.header('auth-token', token).status(200).json({ status: true, data: token, user });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
    res.status(200).json({ success: true, message: "Logout Success" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
