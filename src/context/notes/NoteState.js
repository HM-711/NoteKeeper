import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:3100";
    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);

    //Get all notes
    const getNotes = async () => {

        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setnotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag)=>{

        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
    
        const note = await response.json();
        setnotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote = async (id) => {

        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('token')
            },
        });
        const deletejson = response.json();

        //Logic to delete node from client side
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const editjson =  response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));

        //Logic to edit in client side
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }
    return(
        <noteContext.Provider value={{notes, setnotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;