import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote'
import Noteitem from './Noteitem';


const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setnote] = useState({ id:"",etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  const handleUpdateNote = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note has been Updated Successfully", "success");
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-5">
          <AddNote showAlert={props.showAlert} />
        </div>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleUpdateNote} className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7">
          <div className="row my-3 mx-3 px-3">
            <h1 className="text-center mt-2 pt-2">Your Notes</h1>
            <div className="container mx-2 my-2">
              {notes.length === 0 && 'No notes to display'}
            </div>
            {notes.map((note) => {
              return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes