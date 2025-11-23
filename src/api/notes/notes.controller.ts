import { Request, Response } from "express";
import Note from "../../models/notes";
import Account from "../../models/accounts";

const createNote = async (req: Request, res: Response) => {
    try {
        const { title, content, owner } = req.body;
        if (!title || !content || !owner) {
            return res.status(400).json({ message: 'Title, content, and owner are required' });
        }

        const account = await Account.findById(owner);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const newNote = await Note.create({ title, content, owner });
        account.notes.push(newNote._id);
        await account.save();

        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error: error, success: false });
    }
};

const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error: error, success: false });
    }
};

const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error: error, success: false });
    }
};  

const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error: error, success: false });
    }
};

const getNoteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching note', error: error, success: false });
    }
};


export { createNote, deleteNote, updateNote, getAllNotes, getNoteById };