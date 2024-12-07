/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import Account from '../models/accountmodel';
import Transactions from '../models/transaction';

export const executePayment = async (req: Request, res: Response): Promise<void> => {
    const { sender_id, receiver_id, amount }: { sender_id: number; receiver_id: number; amount: number } = req.body;

    try {

        const sender = await Account.findByPk(sender_id);
        const receiver = await Account.findByPk(receiver_id);

        if (!sender || !receiver) {
            res.status(404).json({ error: 'Sender or receiver not found.' });
            return ;
        }

        const transaction = await Transactions.create({
            type: 'debit',
            source_account: sender_id,
            destination_account: receiver_id,
            amount,
            status: 'Pending',
        });

        if (sender.balance < amount) {
            transaction.status = 'Failed';
            await transaction.save();
            res.status(400).json({ error: 'Insufficient balance.', transaction });
            return ;
        }
        
        sender.balance -= amount;
        receiver.balance += amount;
        await sender.save();
        await receiver.save();

        transaction.status = 'Completed';
        await transaction.save();

        res.status(200).json({
            message: 'Payment executed successfully.',
            transaction
        });

    } catch (error) {
        res.status(500).json({ error: 'Payment error.' });
        
    }
};
