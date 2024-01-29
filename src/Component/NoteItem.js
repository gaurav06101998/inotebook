import notesContext from "../Context/Notes/notesContext";
import React, { useContext } from "react";


const NoteItem=(props)=> {
 const context = useContext(notesContext)
 const {deleteNote}= context;
 const {note,updateNote}= props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
  <div className="card-body ">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-pen-to-square mx-3 "  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  onClick={()=>{updateNote(note)}}></i>
    <i className="fa-solid fa-trash mx-3 " onClick={()=>{deleteNote(note._id); props.showAlert("Deleting note successfully","success")}}></i>
  </div>
</div>
    </div>
  )
}
export default NoteItem
