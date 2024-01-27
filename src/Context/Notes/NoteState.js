import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = []

  const [notes, setNotes] = useState(noteInitial);


  //get all note
  const getNotes = async (id) => {

    const response = await fetch(`${host}/api/notes/fetchnotes/${id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViMjAwZmIzMWViMjg0NjgwYTQ3NzQ4In0sImlhdCI6MTcwNjE2NTk1MH0.2kPwFtNflKeJoX_ZQEytULs9AG8t0QBJ6KRAkpA2EZk",
      }
    });
    const json = await response.json()
    setNotes(json);
    
  };

  //add a new node in client side
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViMjAwZmIzMWViMjg0NjgwYTQ3NzQ4In0sImlhdCI6MTcwNjE2NTk1MH0.2kPwFtNflKeJoX_ZQEytULs9AG8t0QBJ6KRAkpA2EZk",
      },

      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const note = {
      _id: "65b3a2e3ad66b685ea103846",
      user: "65b200fb31eb284680a47748",
      title: title,
      description: description,
      tag: tag,
      date: "2024-01-26T12:17:39.240Z",
      __v: 0,
    };
    const json = await response.json()
    setNotes(notes.concat(note));
  };

  //Deleting a note in notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViMjAwZmIzMWViMjg0NjgwYTQ3NzQ4In0sImlhdCI6MTcwNjE2NTk1MH0.2kPwFtNflKeJoX_ZQEytULs9AG8t0QBJ6KRAkpA2EZk",
      },

      // body data type must match "Content-Type" header
    });
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    const json = await response.json()
    
  };
  const editNote = async (id, title, description, tag) => {
    // Api call made
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViMjAwZmIzMWViMjg0NjgwYTQ3NzQ4In0sImlhdCI6MTcwNjE2NTk1MH0.2kPwFtNflKeJoX_ZQEytULs9AG8t0QBJ6KRAkpA2EZk",
      },

      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    //Edit notes in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
    const json = await response.json()
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
