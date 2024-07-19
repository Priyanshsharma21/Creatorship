import jwt from 'jsonwebtoken';

export const isLoggesIn = async (req, res, next) => {
  try {
    const token = req.header('auth-token') || req.headers.authorization.split(" ")[1] || req.header("Authorization")?.replace("Bearer ", " ") 
    if (!token) return res.status(401).json({ status: false, message: 'Access Denied' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ status: false, message: 'Invalid Token' });
  }
};