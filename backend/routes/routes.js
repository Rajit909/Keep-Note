import express from "express";

import { 
    Home,
    addNote,
    updateNote,
    getNotes,
    deleteNote,
    editNote,
} from "../controller/note.controller.js";

const Router = express();

Router.get("/", Home)
Router.post("/addnote", addNote);
Router.put("/updatenote", updateNote);
Router.get("/notes/:email", getNotes);
Router.delete("/deletenote/:email/:id", deleteNote);
Router.put("/editNote/:id", editNote);


export default Router