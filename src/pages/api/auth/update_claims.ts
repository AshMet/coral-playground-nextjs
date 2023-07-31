// import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../index";

export default async function updataClaims(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create a single supabase client for interacting with your database
  // const supabase = createClient(
  //   `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  //   `${process.env.SUPABASE_SERVICE_KEY}`
  // );
  if (req.method === "GET") {
    const { userId, userRole, claimsAdmin } = req.body;
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      app_metadata: { user_role: userRole, claims_admin: claimsAdmin },
    });

    if (error) {
      res.status(401).json({ error: error.message });
    } else if (data) {
      res.status(200).json({ data });
    }
  }
}
