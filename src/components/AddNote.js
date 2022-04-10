import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"", description:"", tag:""});
    const handleAddNote = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag="");
        setnote({ title: "", description: "", tag: "" });
        props.showAlert("Note has been Added Successfully", "success");
    }
    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container my-4">
                <h1 className="my-3 py-3">Add notes</h1>
                <form className="my-3">
                    <div className="my-3">
                        <input type="text" className="form-control addinput py-3" id="title" name="title"aria-describedby="emailHelp" placeholder="Title of the Note" value={note.title} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="my-3">
                        <input type="text" className="form-control addinput py-3" id="description" name="description" placeholder="Describe Your Note" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="my-3">
                        <input type="text" className="form-control addinput py-3" id="tag" name="tag" placeholder="Place your note under a tag" value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary mt-3 mx-2 btn-lg" onClick={handleAddNote}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote