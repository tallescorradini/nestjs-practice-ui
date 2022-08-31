import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(404).json({ error: "not found" });

  const { body } = req;

  const response = await fetch(`${process.env.NESTJS_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });

  const data = await response.json();

  res.status(response.status).json({ accessToken: data.access_token || null });
}
