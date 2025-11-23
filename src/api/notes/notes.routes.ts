import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "./notes.controller";

const notesRouter = express.Router();

notesRouter.post('/createNote', createNote);
notesRouter.delete('/deleteNote/:id', deleteNote);
notesRouter.put('/updateNote/:id', updateNote);
notesRouter.get('/getAllNotes', getAllNotes);
notesRouter.get('/getNoteById/:id', getNoteById);

export default notesRouter;