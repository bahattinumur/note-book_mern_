import React, { useEffect, useState } from "react";
import NotesDetail from "../components/notes-detail";
import NoteForm from "../components/note-form";

const Home = () => {
  const [notes, setNotes] = useState(null);
  const [noteError, setNoteError] = useState();

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/v1/notes");
      const responseData = await response.json(); 

      if (response.ok) {
        setNotes(responseData.data);
      } else {
        setNoteError(
          responseData.message || "An error occurred while fetching notes."
        );
        setNotes([]);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      setNoteError("An error occurred while fetching notes.");
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchNotes();

    const intervalId = setInterval(fetchNotes, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home">
      <div className="not-form">
        <NoteForm />
      </div>
      <div className="notes">
        {notes &&
          notes.map((item) => <NotesDetail key={item._id} note={item} />)}
      </div>
    </div>
  );
};

export default Home;
