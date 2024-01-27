import React, { useContext, useState } from "react";
import NoteContext from "./Note";
import notesContext from "../Context/Notes/notesContext";

function AddNote() {
    const [note,setNote]=useState({title: "",description: "",tag: ""})
    const {addNote}= useContext(notesContext)
  const handleClick = (e) => {
     addNote(note.title,note.description,note.tag);
     setNote({title: "",description: "",tag: ""})
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}
  return (
    <div className="container my-3">
      <h2>Add Note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          onChange={handleChange}
          value={note.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripton:
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          onChange={handleChange}
          value={note.description}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag:
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={handleChange}
        />
      </div>
      <input
       disabled={note.title.length<5 || note.description.length<5}
        className="btn btn-primary"
        onClick={handleClick}
        type="submit"
        value="Submit"
      />
      <NoteContext />
    </div>
  );
}

export default AddNote;
