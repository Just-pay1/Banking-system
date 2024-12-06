import { Request, Response } from 'express';
import Account from "../models/accountmodel";
import { generateEgyptianIBAN } from "../util/account_number"
import { createAccountSchema, UpdateAccountSchema } from '../validation/accountValidation';

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
    // validate the request body
    const { error, value } = createAccountSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

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
    //console.error('Error creating account:', error);
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
    //console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

// put request
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { error, value } = UpdateAccountSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { id } = req.params;
    const { account_type, balance, status } = req.body;
    const account = await Account.findOne({ where: { id: id } });

    if (!account) {
      res.status(404).json({ message: 'Account not found' });
    }

    else {
      account.account_type = account_type || account.account_type;
      account.balance = balance || account.balance;
      account.status = status || account.status;

      await account.save();
      res.status(200).json({ account });
    }
  } catch (error) {
    //console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }

};


