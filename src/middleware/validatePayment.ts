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
import { Request, Response, NextFunction } from 'express';

export const ValidatePayment = (req: Request, res: Response, next: NextFunction): void => {
    const { sender_id, receiver_id, amount } = req.body;

    // Validate input
    if (!Number.isInteger(sender_id) || !Number.isInteger(receiver_id) || typeof amount !== 'number' || amount <= 0) {
        res.status(400).json({ error: 'Invalid input. sender_id and receiver_id must be integers, and amount must be a positive number.' });
    }

    next(); // If validation is successful, pass control to the next middleware or route handler
};


