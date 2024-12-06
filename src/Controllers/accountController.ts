import { Request, Response } from 'express';
import Account from "../models/accountmodel";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}