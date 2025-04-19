import React, { useState, createContext, useRef } from "react";

import Header from "./app/Header";
import Note from "./app/Note";
import CreateArea from "./app/CreateArea";
import { useEffect } from "react";

export const dataContext = createContext();

function App() {
  const [theme, setTheme] = useState(false);
  const [notes, setNotes] = useState([]);
  const data = "blackbox"

  let renders = useRef(0);

  useEffect(() => {
    renders.current++;
    console.log("App: " + renders.current);
  }, [notes]);

  function themeMode() {
    setTheme(!theme);
  }

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(noteIndex) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== noteIndex;
      });
    });
  }

  return (
    <>
      <div className="app" data-bs-theme={theme ? "dark" : "light"}>
        <dataContext.Provider value={{ addNote, deleteNote  , data}}>
          <Header />
          <button onClick={themeMode}>mode</button>
          <div className="container">
            <CreateArea />
            {/* uses addNote */}
            {notes.map((noteItem, index) => {
              return (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  // uses deleteNote
                />
              );
            })}
          </div>
        </dataContext.Provider>
      </div>
    </>
  );
}

export default App;
