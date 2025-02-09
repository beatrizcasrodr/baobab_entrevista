// src/components/Note.jsx
import React, { useState } from "react";


const Note = ({ note, editNote, deleteNote }) => {
  const { id, titulo, contenido, categoria } = note;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(titulo);
  const [editedContent, setEditedContent] = useState(contenido);
  const [editedCategory, setEditedCategory] = useState(categoria);

  const handleSave = () => {
    editNote({ id, titulo: editedTitle, contenido: editedContent, categoria: editedCategory });
    setIsEditing(false);
  };

  
  return (
    <div className={`note category-${categoria}`}>
      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            value={editedTitle || "" }
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Título"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Contenido"
          />
          <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}>
            <option value="work">Trabajo</option>
            <option value="personal">Personal</option>
            <option value="ideas">Ideas</option>
          </select>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div className="note-view">
          <h3>{editedTitle}</h3>
          <p>{editedContent}</p>
          <span className="category-label">{editedCategory}</span>
          <div className="note-buttons">
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => deleteNote(id)}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
