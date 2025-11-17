import { accounts } from "../../data/accounts";
import { Request, Response } from "express";

export const getAllAccounts = (req: Request, res: Response) => {
    res.status(200).json({ accounts })
};

export const getAccountById = (req: Request, res: Response) => {
    const { id } = req.params;
    const account = accounts.find((account) => account.id === parseInt(id));
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ account: account });
};

export const getAccountByUsername = (req: Request, res: Response) => {
    const { username } = req.params;
    const account = accounts.find((account) => account.username === username);
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ account: account });
};

export const createAccount = (req: Request, res: Response) => {
    const { username, funds } = req.body;
    if (!username || !funds) {
        return res.status(400).json({ message: 'Username and funds are required' });
    }
    const newAccount = {
        id: accounts.length + 1,
        username,
        funds
    }
    accounts.push(newAccount);
    res.status(201).json({ message: 'Account created successfully', account: newAccount });
};

export const deleteAccount = (req: Request, res: Response) => {
    const { id } = req.params;
    const account = accounts.find((account) => account.id === parseInt(id));
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    accounts.splice(accounts.indexOf(account), 1);
    res.status(200).json({ message: 'Account deleted successfully', account: account });
};

export const updateAccount = (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, funds } = req.body;
    if (!username || !funds) {
        return res.status(400).json({ message: 'Username and funds are required' });
    }
    const account = accounts.find((account) => account.id === parseInt(id));
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    account.username = username;
    account.funds = funds;
    res.status(200).json({ message: 'Account updated successfully', account: account });
};

export default {
    getAllAccounts,
    getAccountById,
    getAccountByUsername,
    createAccount,
    deleteAccount,
    updateAccount
};