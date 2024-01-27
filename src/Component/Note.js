import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import notesContext from "../Context/Notes/notesContext";

function NoteContext() {
  const noteContext = useContext(notesContext);
  const { notes, getNotes } = noteContext;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);

  return (
    <>
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="col-form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="col-form-label">
                      Description:
                    </label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.title}
                      onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="col-form-label">
                      Tag:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.tag}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={ref}
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default NoteContext;
