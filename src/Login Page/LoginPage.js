import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Backend Firebase/FirebaseAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Backend Firebase/FirebaseDatabase";
import logoImage from "../Images/EveryoneEatslogo.png";
import "./styleLogin.css";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  function authUser(val) {
    try {
      signInWithEmailAndPassword(auth, val.email, val.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userRef = doc(db, "User_Authentication", user.uid); // Assuming you have a "users" collection

          // Fetch the user's role from Firestore
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userRole = userData.role;

            // Determine where to navigate based on the user's role
            if (userRole === "Donor") {
              navigate("/DonorInterface");
            } else if (userRole === "Recipient") {
              navigate("/RecipientInterface");
            } else if (userRole === "Community Representative") {
              navigate("/CommunityInterface");
            } else {
              navigate("/AdminInterface");
            }
          }
        })
        .catch((error) => {
          console.error("Error signing in the user: ", error);
        });
    } catch (error) {
      console.error("Error signing in the user: ", error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //setErrors(Validation(values));
    authUser(values);
  };
  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          <div className="col-md-6 side-image">
            <div className="text">
              <p>
                We're not getting younger. Today let's fight hunger!{" "}
                <i>
                  <br />- MetaTech
                </i>
              </p>
            </div>
          </div>

          <div className="col-md-6 right">
            <div className="image-Logo">
              <img src={logoImage} alt="Logo" />
            </div>

            <form action="" onSubmit={handleSubmit}>
              <div className="input-box mt-2">
                <h2 className="text-center me-2">Login</h2>
                <div className="input-field">
                  <input
                    type="email"
                    className="input"
                    name="email"
                    required
                    autoComplete="off"
                    onChange={handleInput}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    name="password"
                    required
                    onChange={handleInput}
                  />
                  <label htmlFor="pass">Password</label>
                </div>
                <div className="input-field">
                  <button type="submit" className="submit">
                    Log In
                  </button>
                </div>
                <div className="signin">
                  <span>
                    Doesn't have an account?{" "}
                    <Link to="/SignupPage">Create an account</Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
