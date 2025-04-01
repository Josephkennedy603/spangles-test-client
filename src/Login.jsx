import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/appSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const userLogin = async () => {
    setError(null);

    if (email === "" || password === "") {
      setError("Fill all the fields!");
    } else {
      if (
        email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/user/login",
            {
              email: email,
              password: password,
            }
          );
          console.log("dataaaaaaa", data);

          if (data) {
            console.log("success");
            dispatch(updateUser(data));
            if (data?.role === "admin") {
              navigator("/todo");
            } else {
              navigator("/home");
            }
          }
        } catch (error) {
          console.log(error);
          setError(error?.response?.data || "Something went wrong in server!");
        }
      } else {
        setError("Enter a valid email");
      }
    }
  };

  return (
    <div className="main">
      <div className="login-main">
        <div className="login-container">
          <h3>Login</h3>
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && <span style={{ color: "red" }}>{error}</span>}

          <button onClick={userLogin}>Login</button>
          <p>
            New user? <Link to={"/signup"}>Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
