const express = require('express');
const router = express.Router();
const Note = require('../models/Notes')
const { validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// Routes:1 creating new note Endpoint localhost:5000/api/notes/addnote    login required
router.post('/addnote',fetchuser,[
    body('title','title is invalid').isLength({min: 3}),
    body('description','description is invalid').isLength({min: 5}),
],async (req,res)=>{
   const errors =  validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json({error: 'please add a valid note'})
   }
   try {
     const {title,description,tag} = req.body;

    const note =  new Note({
        title,description,tag,user:req.user.id
    })
    const saveNote = await note.save();
    res.json(saveNote)
   } 
   catch (error) {
    console.log(error);
    res.status(500).json({error: "Some error is occured"})
}
})
// Routes:2 fetching all notes Endpoint localhost:5000/api/notes/fetchnotes  login required
router.get('/fetchnotes',fetchuser,async (req,res)=>{
   try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);

   } 
   catch (error) {
    console.log(error);
    res.status(500).json({error: "Some error is occured"})
}
})
// Routes:3 updating notes Endpoint localhost:5000/api/notes/updatenote  login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const { title,description,tag} =req.body;
    const newNotes ={}
    if(title){newNotes.title = title}
    if(description){newNotes.description = description}
    if(tag){newNotes.tag = tag}

    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send('Not Found')}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed');
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
    res.json(note)
})

// Routes:4 delete notes Endpoint localhost:5000/api/notes/deletenote  login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {  
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')}


    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Not Allowed');
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"sucess": "Notes has been deleted", note:note})
}
catch (error) {
 console.log(error);
 res.status(500).json({error: "Some error is occured"})
}
})




module.exports = router