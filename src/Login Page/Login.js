import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Backend Firebase/FirebaseAuth";
import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../Backend Firebase/FirebaseDatabase";

function Login() {
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
              navigate("/HomeDonor");
            } else if (userRole === "Recipient") {
              navigate("/HomeRecipient");
            } else if (userRole === "Community_Representative") {
              navigate("/HomeCommunity");
            } else {
              navigate("/HomeAdmin");
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
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Log in
          </button>
          <p>You are agree to our terms and policies</p>
          <Link
            to="/Signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Login() {
//   const handleSubmit
//   return (
//     <div>
//       <h3>Register User</h3>
//       <input placeholder="Email" />
//       <input placeholder="Password"/>
//       <button></button>
//     </div>
//   );
// }

// export default Login;
