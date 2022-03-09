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
                <h1>Add notes</h1>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote