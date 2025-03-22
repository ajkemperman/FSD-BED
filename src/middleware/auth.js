import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!token) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }
    if (decoded.role === "admin") {
      req.user = decoded;
    } else if (decoded.aboutMe) {
      req.host = decoded; // Assign as a host if `hostId` exists
    }

    next();
  });
};

export default authMiddleware;
