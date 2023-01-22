import mongoose from "mongoose"

const NotesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },

    notes: [
        {
            title: {
                type: String,
                required: [true, "Name is required"],
                maxlength: [20, "Title Should be 20 Character long"]
            },
            note: String,
            CreatedAt: {
                type: Date,
                immutable: true,
                default: Date.now(),
            },
            UpdatedAt: {
                type: Date,
                immutable: true,
            },
        }
    ]
})

const model = mongoose.model("Note", NotesSchema);
export default model