// import React, { useState, useContext } from "react";
import React, { useState, useRef, useEffect, useContext } from "react";

import { dataContext } from "../App";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea() {
  const { addNote } = useContext(dataContext);

  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  let renders = useRef(0);

  useEffect(() => {
    renders.current++;
    console.log("CreateArea: " + renders.current);
  }, [note]);

  let highlightTextArea = useRef();

  useEffect(() => {
    highlightTextArea.current.focus();
  }, []);

  function handleClick() {
    setExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (note.content != "") {
      addNote(note); //useContext
      setNote({
        title: "",
        content: "",
      });
      setExpanded(false);
    } else {
      setExpanded(false);
    }
    event.preventDefault();
  }

  return (
    <div className="container col-sm col-lg-6">
      <form
        className="create-note"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          ref={highlightTextArea}
          name="content"
          onClick={handleClick}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />

        <Zoom in={isExpanded ? true : false}>
          <Fab color="info" onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
