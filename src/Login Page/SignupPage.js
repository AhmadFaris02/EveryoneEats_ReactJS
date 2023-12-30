import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../Backend Firebase/FirebaseDatabase";
import { auth } from "../Backend Firebase/FirebaseAuth";
import logoImage from "../Images/EveryoneEatslogo.png";
import "./styleSignUp.css";

function SignupPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState("");

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
      if (selectedType === "Donor") {
        const donorRef = doc(collection(db, "Donor"), user.uid);
        await setDoc(donorRef, {
          name: val.name,
          email: val.email,
        });
        const userRef = doc(collection(db, "User_Authentication"), user.uid);
        await setDoc(userRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        console.log("Document written with ID: ", user.uid);
        navigate("/DonorInterface");
      } else if (selectedType === "Recipient") {
        const recipientRef = doc(collection(db, "Recipient"), user.uid);
        await setDoc(recipientRef, {
          name: val.name,
          email: val.email,
        });
        const userRef = doc(collection(db, "User_Authentication"), user.uid);
        await setDoc(userRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        console.log("Document written with ID: ", user.uid);
        navigate("/RecipientInterface");
      } else if (selectedType === "Community Representative") {
        const communityRef = doc(
          collection(db, "Community_Representative"),
          user.uid
        );
        await setDoc(communityRef, {
          name: val.name,
          email: val.email,
        });
        const userRef = doc(collection(db, "User_Authentication"), user.uid);
        await setDoc(userRef, {
          name: val.name,
          email: val.email,
          role: selectedType,
        });
        console.log("Document written with ID: ", user.uid);
        navigate("/CommunityInterface");
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
            <div className="input-box">
              {/* <div className="image-Logo">
                <img src={logoImage} alt="Logo Image" />
              </div> */}

              <h2 className="text-center me-2">Create account</h2>

              <div className="button-group">
                <button
                  className="custom-button active"
                  onClick={() => setSelectedType("Donor")}
                >
                  Donor
                </button>
                <button
                  className="custom-button"
                  onClick={() => setSelectedType("Recipient")}
                >
                  Recipient
                </button>
                <button
                  className="custom-button"
                  onClick={() => setSelectedType("Community Representative")}
                >
                  Community Representative
                </button>
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    name="name"
                    required
                    autoComplete="off"
                    onChange={handleInput}
                  />
                  <label htmlFor="Name">Full Name</label>
                </div>

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
                    Sign Up
                  </button>
                </div>

                <div className="signin">
                  <span>
                    Already have an account? <Link to="/">Log in here</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
