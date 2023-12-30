import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../Backend Firebase/FirebaseDatabase";
import { auth } from "../Backend Firebase/FirebaseAuth";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("Donor");

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  async function authAndWriteDatabase(val) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        val.email,
        val.password
      );
      const user = userCredential.user;
      console.log("User authentication data: ", user);
      if (selectedType == "Donor") {
        const donorRef = doc(collection(db, "Donor"), user.uid);
        await setDoc(donorRef, {
          name: val.name,
          email: val.email,
          //role: selectedType,
        });
        const userRef = doc(collection(db, "User_Authentication"), user.uid);
        await setDoc(userRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        console.log("Document written with ID: ", user.uid);
        navigate("/HomeDonor");
      } else if (selectedType == "Recipient") {
        const recipientRef = doc(collection(db, "Recipient"), user.uid);
        await setDoc(recipientRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        const userRef = doc(collection(db, "User_Authentication"), user.uid);
        await setDoc(userRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        console.log("Document written with ID: ", user.uid);
        navigate("/HomeRecipient");
      } else if (selectedType == "Community Representative") {
        const communityRef = doc(
          collection(db, "Community_Representative"),
          user.uid
        );
        await setDoc(communityRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        const userRef = doc(collection(db, "User_Authentication"), user.uid);
        await setDoc(userRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        console.log("Document written with ID: ", user.uid);
        navigate("/HomeCommunity");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //setErrors(Validation(values));
    authAndWriteDatabase(values);
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-success vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="text-center mb-4">Sign Up</h2>
        <div class="btn-group" role="group" aria-label="Basic outlined example">
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => setSelectedType("Donor")}
          >
            Donor
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => setSelectedType("Recipient")}
          >
            Recipient
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => setSelectedType("Community Representative")}
          >
            Community Representative
          </button>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className="form-control rounded-0"
              onChange={handleInput}
            />
          </div>
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
            Sign Up
          </button>
          <p>You are agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

// import React from "react";

// function Signup() {
//   return <div>

//   </div>;
// }

// export default Signup;
