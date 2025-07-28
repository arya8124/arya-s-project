import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  username: string;
}

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify
  jwt.verify(token, "your_jwt_secret", (err, user: any | undefined) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (user) {
      req.body.user = user;
    }
    next();
  });
};

export default authenticateToken;
