import jwt from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_SECRET || "asdfghjklpoiuytrew3w45678ijuyhftgds"

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_TOKEN, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_TOKEN);
};