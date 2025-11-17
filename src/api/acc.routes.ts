import express from "express";
import { getAllAccounts, getAccountById, getAccountByUsername, createAccount, deleteAccount, updateAccount } from "./acc.controller";

const router = express.Router();

router.get('/allAccounts', getAllAccounts);
router.get('/getAccount/:id', getAccountById);
router.get('/getAccountByUsername/:username', getAccountByUsername);
router.post('/createAccount', createAccount);
router.delete('/deleteAccount/:id', deleteAccount);
router.put('/updateAccount/:id', updateAccount);

export default router;