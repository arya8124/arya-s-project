import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken: any = req.header("Authorization")?.replace("Bearer", "");
  const refreshToken = req.body.token;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    
    const decodedAccessTokenPayload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as { id: number; tokenType: string };

    if (decodedAccessTokenPayload.tokenType !== "access") {
      return res
        .status(403)
        .json({ message: "Invalid token type: expected access token." });
    }

    req.userId = decodedAccessTokenPayload.id;
    return next();
  } catch (err) {
    const error = err as Error; 
  console.error("Error message:", error.message);
    if (error.name === "TokenExpiredError") {
      if (!refreshToken) {
        return res.status(401).json({
          message: "Refresh token is required to refresh access token",
        });
      }

      try {
        const decodedRefreshTokenPayload = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET as string
        ) as { id: number };

        req.userId = decodedRefreshTokenPayload.id;
        const newAccessToken = jwt.sign(
          { id: decodedRefreshTokenPayload.id, tokenType: "access" },
          process.env.JWT_SECRET as string,
          { expiresIn: "15m" }
        );

        res.header("Authorization", `Bearer ${newAccessToken}`);
        return next();
      } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    } else {
      return res.status(403).json({ message: "Invalid access token" });
    }
  }
};

export default authMiddleware;
