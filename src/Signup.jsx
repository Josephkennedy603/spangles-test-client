import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "./redux/appSlice";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigator = useNavigate();

  const usersignup = async () => {
    setError(null);
    if (name === "" || email === "" || password === "" || role === "") {
      setError("Fill all the fields!");
    } else {
      if (
        email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        if (password.match(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
          try {
            const { data } = await axios.post(
              "http://localhost:5000/user/signup",
              {
                name: name,
                email: email,
                password: password,
                role: role,
              }
            );
            console.log("this is data", data);

            if (data) {
              navigator("/login");
            }
          } catch (error) {
            console.log(error?.response?.data);
            setError(error?.response?.data);
          }
        } else {
          setError("enter valid password");
        }
      } else {
        setError("Enter a valid email");
      }
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <h3>Sign-up</h3>
        <label htmlFor="">
          Name <span className="mandatary-star">*</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="">
          Email <span className="mandatary-star">*</span>
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="">
          Password <span className="mandatary-star">*</span>
        </label>
        <input
          type="Password"
          placeholder="****"
          min={8}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="">
          Role <span className="mandatary-star">*</span>
        </label>
        <select onChange={(e) => setRole(e.target.value)}>
          <option selected></option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error !== null && <span style={{ color: "red" }}>{error}</span>}

        <button onClick={usersignup}>Signup</button>
        <p>
          Already Signed in? <Link to={"/login"}>login </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
