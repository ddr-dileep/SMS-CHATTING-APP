import JWT from "jsonwebtoken";

export const generateToken = (data: Object): string => {
  return JWT.sign(data, process.env.TOKEN_SECRET_KEY!, { expiresIn: "2d" });
};
