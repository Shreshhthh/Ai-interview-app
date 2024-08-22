import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const createToken = (id, Response) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  const cookie = cookies().set({
    name: "ai-token",
    value: token,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "strict",
  });

  return token;
};
