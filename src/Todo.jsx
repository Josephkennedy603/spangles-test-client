import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [id, setId] = useState();

  const getTodoList = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/todo/all");
      console.log("todo", data);
      setTodoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const deleteTodoItem = async (id) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:5000/todo/delete/" + id
      );
      setTodoList(data);
    } catch (error) {}
  };

  const editTodoItemm = async () => {
    try {
      const { data } = await axios.put("http://localhost:5000/todo/edit", {
        _id: id,
        title: title,
        content,
        content,
      });
      setTitle(undefined);
      setContent(undefined);
      setTodoList(data);
      setId(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Main">
      <div className="sub-main">
        <div className="create-button">
          <Link to={"/create"}>
            <button>Create+</button>
          </Link>
        </div>

        <h1>Todo List</h1>
        <div>
          <table className="table-style" border={3}>
            <tbody>
              <tr>
                <th>S.NO</th>
                <th>title</th>
                <th>Content</th>
                <th colSpan={2}>Modify</th>
              </tr>

              {todoList.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s?.title}</td>
                  <td>{s?.content}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setIsEdit(true);
                        setId(s?._id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteTodoItem(s?._id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEdit && (
          <form className="edit-form">
            <h1> Update </h1>
            <label> Title </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label> Content </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />

            <input
              className="update-button"
              value={"update"}
              type="submit"
              onClick={() => {
                editTodoItemm();
              }}
            />
            <input
              className="update-button close-button"
              value={"close"}
              type="submit"
              onClick={() => {
                setIsEdit(false);
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Todo;
