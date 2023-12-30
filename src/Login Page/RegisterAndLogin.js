import React from "react";
import { db } from "../Backend Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterAndLogin() {
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(db, email, password).then((data) => {
      console.log(data, "authData");
      history("/home");
    });
  };

  return (
    <div className="App">
      <h1>SignIn</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" placeholder="Password" />
        <br />
        <br />
        <button>SignIn</button>
      </form>
    </div>
  );
}

export default RegisterAndLogin;
