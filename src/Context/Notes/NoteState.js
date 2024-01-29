import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = []
  // const id ="65b3a2e3ad66b685ea103846"

  const [notes, setNotes] = useState(noteInitial);


  //get all note
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json);
    
  };

  //add a new node in client side
  const addNote= async(title, description, tag)=> {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    
    const json = await response.json();
    setNotes(notes.concat(json));
  }

  //Deleting a note in notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },

      // body data type must match "Content-Type" header
    });
    
    const json = await response.json()
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    
    
  };
  // updating a note 
  const editNote = async (id, title, description, tag) => {
    // Api call made
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },

      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json()
    
    //Edit notes in client side
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
   
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
