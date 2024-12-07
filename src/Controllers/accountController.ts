/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @stylistic/ts/semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable n/no-process-env */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from 'express';
import Account from "../models/accountmodel";
import { generateEgyptianIBAN } from "../util/account_number"
import { or } from 'sequelize';

// get request (fetch all accounts)
export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// post request
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { account_type, balance, status } = req.body;
    const account_number = generateEgyptianIBAN();

    const account = await Account.create({
      account_type,
      account_number,
      balance,
      status
    });

    res.status(201).json({ account });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
};

// delete request
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the account by ID
    const account = await Account.findByPk(id);
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
    }
    else {
      await account.destroy();
      res.status(200).json({ message: 'Account successfully deleted' });
    }

  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

