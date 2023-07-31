import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  if (req.method === "GET") {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(401).json({ error: error.message });
    } else if (data) {
      res.status(200).json({ data });
    }
  }
}
