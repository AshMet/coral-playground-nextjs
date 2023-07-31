import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, firstName, lastName, username, userRole } = req.body;
  if (req.method === "GET") {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username,
          user_role: userRole,
        },
      },
    });

    if (error) {
      res.status(401).json({ error: error.message });
    } else if (data) {
      res.status(200).json({ data });
    }
  }
}
