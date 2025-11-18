import { accounts } from "../../../data/accounts";
import { Request, Response } from "express";
import Account from "../../models/accounts";

const getAllAccounts = async (req: Request, res: Response) => {
    try {
        const allAccounts = await Account.find();
        res.status(200).json({ success: true, data: allAccounts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts', error: error, success: false });
    }
};

const getAccountById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const account = await Account.findById(id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ success: true, data: account });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching account', error: error, success: false });
    }
};

const getAccountByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const account = await Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json({ success: true, data: account });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching account', error: error, success: false });
    }
};

const createAccount = async (req: Request, res: Response) => {
    try {
        const { username, funds } = req.body;

        if (!username || funds == null) {
            return res.status(400).json({ message: 'Username and funds are required' });
        }

        const newAccount = await Account.create({ username, funds });
        res.status(201).json({ success: true, data: newAccount });

    } catch (error) {
        res.status(500).json({ message: 'Error creating account', error: error, success: false });
    }
};

const deleteAccount = async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndDelete(id);
        
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ success: true, data: account });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error: error, success: false });
    }
};

const updateAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, funds } = req.body;

        if (!username || funds == null) {
            return res.status(400).json({ message: 'Username and funds are required' });
        }

        const account = await Account.findByIdAndUpdate(id, { username, funds }, { new: true });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ success: true, data: account });

    } catch (error) {
        res.status(500).json({ message: 'Error updating account', error: error, success: false });
    }
};


export {
    getAllAccounts,
    getAccountById,
    getAccountByUsername,
    createAccount,
    deleteAccount,
    updateAccount
};