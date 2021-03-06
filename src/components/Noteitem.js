import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
  return (
    <div className="col-md-6">
          <div className="card my-2 mx-2 py-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                          <i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id); props.showAlert("Note has been Deleted Successfully", "success");}}></i>
                          <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { updateNote(note)}}></i>
                </div>
          </div>
    </div>
  )
}

export default Noteitem