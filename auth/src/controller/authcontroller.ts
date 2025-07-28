import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// User Signup
export const signup: any = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("User Created", user);

    res
      .status(201)
      .json({ message: "User created successfully", User: { id: user.id } });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// User Signin
export const signin: any = async (req: any, res: any): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Refresh Token
export const refreshToken: any = async (req: any, res: any): Promise<void> => {
  const token = req.body.token;

  if (!token) {
    console.log("Refresh token is missing");
    return res.sendStatus(401);
  }

  try {
    const decodedRefreshTokenPayload = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    );
    console.log("Decoded Refresh Token Payload:", decodedRefreshTokenPayload);

    const userId = (decodedRefreshTokenPayload as { id: number }).id;
    if (!userId) {
      console.error(
        "User ID is missing from refresh token. Refresh token might be invalid."
      );
      return res
        .status(400)
        .json({ message: "Invalid refresh token. No user ID found." });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    const error = err as Error; 
    if (error.name === "TokenExpiredError") {
      console.error("Refresh token expired", err);
      res.status(500).json({ message: "Refresh token expired" });
    }
    console.error("Error refreshing token:", err);
    res.status(500).json({ message: "Error refreshing token" });
  }
};

// Logout Function
export const logout: any = async (req: any, res: any): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findByPk((decoded as { id: number }).id);

    if (user) {
      user.refreshToken = null;
      await user.save();
      res.status(200).json({ message: "Logout successful" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

const generateAccessToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "1h",
  });
};
