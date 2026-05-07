import Notes from "../models/noteModel.js";
export const getNote = async (_, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(`Error getting Notes`, error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const getOneNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error(`Error getting Notes`, error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Notes({ title, content });
    const saveNotes = await newNote.save();
    res.status(201).json( saveNotes );
  } catch (error) {
    console.error(`Error creating Note`, error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { returnDocument: "after" },
    );
    if (!updatedNote) return res.status(404).json({ message: "Not not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.error(`Error updating Note`, error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note Deleted successful" });
  } catch (error) {
    console.error(`Error deleting the  Note`, error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
