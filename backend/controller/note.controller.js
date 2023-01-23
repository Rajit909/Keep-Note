import NoteSchema from "../models/notesModel.js"
import asyncHandler from "../utils/asyncHandler.js"
import CustomError from "../utils/customError.js"
import sendResponse from "../utils/sendResponse.js"

export const Home = (req, res) => {
    res.status(200).json({
        message: "Hello Notes User"
    })
}

export const addNote = asyncHandler( async (req, res) => {
    const { email, name } = req.body;

    if (!(email && name)) {
        throw new CustomError("All fields are required", 400);
    }

    const existingUser = await NoteSchema.findOne({ email });

    if (existingUser) {
        throw new CustomError("User Already exists",400)
    }

    let data = {
        email,
        notes: [{
            title: `Hello ${name}`,
            note: "Welcome to Keep-Notes."
        }]
    };

    const newNote = await NoteSchema.create(data);

    await newNote.save({
        validateBeforeSave: false
    })

    sendResponse(res, newNote);

})


export const updateNote =asyncHandler( async (req, res) => {

    const { title, note, email} = req.body;

    if (!(title && note && email)) {
        throw new CustomError("All fields are required",404)
    }

    const existingUser = await NoteSchema.findOne({email});

    if (!existingUser) {
        throw new CustomError("User not found", 400)
    }

    existingUser.notes.unshift({ title, note });

    sendResponse(req, existingUser)
})


export const getNotes =asyncHandler( async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new CustomError("Email is required", 404)
    }

    const notes = await NoteSchema.findOne({ email })

    if (!notes) {
        throw new CustomError("Notes not found", 404)
    }

    res.status(200).send(notes);
})


export const deleteNote =asyncHandler( async (req, res) => {
    const { email, id } = req.params;

    if (!(email && id )) {
        throw new CustomError("All fields are required", 400)
    }

    let allNotes = await NoteSchema.findOne({ email });

    let newArray = allNotes.notes.filter((item) => {
        return item.id !== id
    });

    allNotes.notes = newArray;

    await allNotes.save({ validateBeforeSave: false });
    sendResponse(res, allNotes);

})

export const editNote =asyncHandler( async (req, res) => {
    const { title, note, email } = req.body;
    const id = req.params.id;

    if (!(title && note && email && id)) {
        throw new CustomError("All fields are required", 400)
    }

    const existingUser = await NoteSchema.findOne({ email });

    if (!existingUser) {
        throw new CustomError("User not found", 400)
    }

    let filterNotes = existingUser.notes.filter((note) => {
        return note.id !== id;
    });

    let singleOne = existingUser.notes.filter((note) => {
        return note.id == id;
    });

    let newValue = {
        title,
        note,
        CreatedAt: singleOne.CreatedAt,
        UpdatedAt: Date.now(),
    };

    let finalNotes = [newValue, ...filterNotes];

    existingUser.notes = finalNotes;

    await existingUser.save({ validateBeforeSave: false })

    sendResponse(res, existingUser)
})