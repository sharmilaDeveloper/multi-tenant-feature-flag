import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, organizationId } = req.body;

    const user = await authService.signup(email, password, organizationId);

    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};