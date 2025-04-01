import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const createTodoItem = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/todo/create", {
        title,
        content,
      });
      console.log(data);
    } catch (error) {
      console.log("errorcatch", error);
    }
  };

  return (
    <div className="Main">
      <div className="formmain">
        <div className="home-button">
          <Link to={"/todo"}>
            <button> HOME </button>
          </Link>
        </div>
        <h1>Enter the Details</h1>
        <form className="form">
          <label>Title </label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label> Content </label>
          <input
            type="text"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <input id="submit-button" type="submit" onClick={createTodoItem} />
        </form>
      </div>
    </div>
  );
};

export default Create;
