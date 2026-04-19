import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const contactRouter = Router();

contactRouter.post("/", async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error.message);
      res.status(500).json({ error: "Failed to save contact" });
      return;
    }

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error("Unexpected error:", (err as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
});
