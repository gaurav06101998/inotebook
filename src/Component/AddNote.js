import React, { useContext, useState } from "react";
import NoteContext from "./Note";
import notesContext from "../Context/Notes/notesContext";

function AddNote() {
    const [note,setNote]=useState({title: "",description: "",tag: ""})
    const {addNote}= useContext(notesContext)
  const handleClick = (e) => {
     e.preventDefault()
     addNote(note.title,note.description,note.tag);
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
          placeholder="title"
          onChange={handleChange}
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
          
          onChange={handleChange}
        />
      </div>
      <input
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
