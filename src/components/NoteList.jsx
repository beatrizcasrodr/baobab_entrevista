
import React from "react";
import Note from "./Note";

//Es para la lista de notas, solo se renderiza Note.
const NoteList = ({ notes, editNote, deleteNote }) => {
  if (notes.length === 0) {
    return <p className="empty-message">No hay notas disponibles.</p>;
  }
  

  return (
    <div className="note-list">

      {notes.map((note) => (
        <Note key={note.id} note={note} editNote={editNote} deleteNote={deleteNote} />
      ))}
    </div>
  );
};

export default NoteList;
