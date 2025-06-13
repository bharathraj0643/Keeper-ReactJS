import {
  useState,
  createContext,
  useEffect,
  useLayoutEffect,
  useReducer,
} from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

export const dataContext = createContext();

import useFetch from "./customHooks/useFetch";
import LoadingOrError from "./ui/LoadingOrError";
import Card from "./home/Card";
import Footer from "./home/Footer";

function Home() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [posts, error] = useFetch(url);

  const [theme, setTheme] = useState(false);
  
  function themeMode() {
    setTheme(!theme);
  }
  // const [color, setColor] = useState("red");

  // useLayoutEffect(()=>{
  //   document.body.style.backgroundColor = color;
  // },[color])

  // function themeMode() {
  //   setColor("black");
  // }

  return (
    <>
      <div className="home" data-bs-theme={theme ? "dark" : "light"}>
        <dataContext.Provider value={{}}>
          <div className="container">
            <Link
              className="btn my-2"
              style={{ background: "#427D9D", color: "#DDF2FD" }}
              to="/app"
            >
              Keeper
            </Link>
            <div className="row justify-content-center">
              {!posts ? (
                <LoadingOrError error={error} />
              ) : (
                posts.map((post) => {
                  return (
                    <Card
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      body={post.body}
                    />
                  );
                })
              )}
            </div>
          </div>
          <Footer />
        </dataContext.Provider>
      </div>
    </>
  );
}

export default Home;
