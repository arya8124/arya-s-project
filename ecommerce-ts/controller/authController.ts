import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();
interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

interface SignInRequestBody {
  email: string;
  password: string;
}

interface SuccessResponse {
  message: string;
  token?: string;
  userId?: number;
}

// Sign-up logic
export const signUp = async (req: any, res: any) => {
  const { username, email, password }: SignUpRequestBody = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Sign-in logic
export const signIn = async (req: any, res: any) => {
  const { email, password }: SignInRequestBody = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret", 
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Sign-in successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Profile route logic
export const getProfile = (req: any, res: any) => {
  const user = req.user as { id: number; email: string }; 
  res.status(200).json({ message: `Welcome ${user.email}` });
};

// Logout route logic (dummy logout)
export const logout = (req: any, res: any) => {
  res.status(200).json({ message: "Logged out successfully" });
};
