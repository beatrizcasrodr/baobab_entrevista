// App.js
import { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // Este estado se usa para editar la nota
  
// Para añadir notas.
const addNote = (newNote) => {
  setNotes([...notes, newNote]);
  console.log("Notas después de añadir:", [...notes, newNote]); // Verificar el estado después de añadir
};

const editNote = (updatedNote) => {
  const updatedNotes = notes.map((note) =>
    note.id === updatedNote.id ? updatedNote : note
  );
  setNotes(updatedNotes);
  console.log("Notas después de editar:", updatedNotes); // Verificar el estado después de editar
};
//Función para borrar la nota.
  const deleteNote = (id) => {
   // Se crea una nueva lista con las notas filtradas por el id de la que se quiere borrar. 
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <NoteForm 
        isNew={!selectedNote} 
        addNote={addNote} 
        editNote={editNote} 
        note={selectedNote} 
      />
      <NoteList 
        notes={notes} 
        editNote={(note) => setSelectedNote(note)} // Pasamos la nota al estado
        deleteNote={deleteNote}
      />

    </div>
  );
}

