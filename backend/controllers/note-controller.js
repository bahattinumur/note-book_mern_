const noteModel = require("../model/notes-model");

exports.getAllNotes = async (req, res) => {
  try {
    const allNotes = await noteModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All notes are fetched successfully",
      result: allNotes.length,
      data: allNotes,
    });
  } catch (err) {
    res.status(400).json({ message: "Notes can not get" });
  }
};

exports.createNote = async (req, res) => {
  try {
    const newNote = await noteModel.create(req.body);
    res.status(200).json({ message: "Note is added", data: newNote });
  } catch (err) {
    res.status(400).json({ message: "Note is can not added" });
  }
};

exports.getNote = async (req, res) => {
  try {
    const oneNote = await noteModel.findById(req.params.id);
    res
      .status(200)
      .json({ message: "The note is successfully taken", data: oneNote });
  } catch (err) {
    res.status(400).json({ message: "Note can not be taken" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await noteModel.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "The note is successfully deleted" });
  } catch (err) {
    res.status(400).json({ message: "The note can not be deleted!" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await noteModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "The note is succesfully updated", data: updatedNote });
  } catch (err) {
    res.status(400).json({ message: "Note can not be updated" });
  }
};