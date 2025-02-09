import { Link, useNavigate, useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
//Formulario para manejar notas.
export default function NotesForm({ isNew, addNote, editNote, notes }) {
  const params = useParams(); 
  const navigate = useNavigate();

  // Estado inicial de la nota
  const defaultState = { 
    titulo: "",
    contenido: "",
    categoria: "trabajo", 
  };

  const [note, setNote] = useState(defaultState);

  // Si estamos editando, cargamos la nota correspondiente
  useEffect(() => {
    if (!isNew && params.id) {
      const noteToEdit = notes.find((n) => n.id === parseInt(params.id));
      console.log("Buscando nota para editar:", params.id, noteToEdit); // Depuración
      if (noteToEdit) {
        setNote({
          titulo: noteToEdit.titulo,
          contenido: noteToEdit.contenido,
          categoria: noteToEdit.categoria,
        });
      }
    }
  }, [isNew, params.id, notes]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de página

    if (!note.titulo.trim() || !note.contenido.trim()) {
      alert("El título y el contenido no pueden estar vacíos.");
      return;
    }

    console.log("Nota antes de guardar:", note); // Depuración

    if (isNew) {
      const newNote={ ...note, id: Date.now() }
      console.log("Agregando nueva nota:", newNote); // Depuración  
      addNote(newNote); // Genera un ID único
    } else {
      const updatedNote = { ...note, id: note.id ??(params.id ? parseInt(params.id) : Date.now())  }; 
      console.log("Editando nota con ID:", updatedNote); // Depuración
      editNote(updatedNote);
    }

    navigate("/"); // Redirige a la página principal después de añadir o actualizar
  };

  return (
    <div id="main">
      <h2>{isNew ? "Nueva Nota" : "Editar Nota"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            placeholder="Título"
            value={note.titulo}
            onChange={(e) => setNote({ ...note, titulo: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            placeholder="Contenido"
            value={note.contenido}
            onChange={(e) => setNote({ ...note, contenido: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={note.categoria}
            onChange={(e) => setNote({ ...note, categoria: e.target.value })}
          >
            <option value="trabajo">Trabajo</option>
            <option value="personal">Personal</option>
            <option value="ideas">Ideas</option>
          </select>
        </div>
        <div className="actions">
          <button className={isNew ? "new" : "update"} type="submit">
            {isNew ? "Añadir Nota" : "Actualizar"}
          </button>
          
        </div>
      </form>
    </div>
  );
}
