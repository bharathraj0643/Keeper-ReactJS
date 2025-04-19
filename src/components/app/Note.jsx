import React, { useContext, useRef, useEffect } from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { dataContext } from "../App";

function Note(props) {
  const { deleteNote } = useContext(dataContext);

  function handleClick() {
    // props.onDelete(props.id);
    deleteNote(props.id); // useContext
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteTwoToneIcon />
      </button>
    </div>
  );
}

export default Note;
