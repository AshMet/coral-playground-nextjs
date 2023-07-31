import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../index";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { error } = await supabase.auth.signOut();

    if (error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(200).json("Logged Out Successfully");
    }
  }
}
