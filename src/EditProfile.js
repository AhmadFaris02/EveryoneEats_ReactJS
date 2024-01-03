import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { db } from "./Backend Firebase/FirebaseDatabase";
import UserAuthContext from "./Login Page/UserAuthContext";

const inputStyle = {
  width: "400px", // Adjust the width as needed
  padding: "5px",
  margin: "8px",
  backgroundColor: "#ccc",
};

const customStyles = {
  // Define your custom styles here
  formControl: {
    width: "100%",
    marginBottom: "10px",
  },

  centerStyle: {
    display: "flex",
    flexDirection: "column", // To stack elements vertically
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  button: {
    backgroundColor: "#BDFFB1",
    color: "white",
    borderRadius: "8px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#BDFFB1", // Change this to the color you prefer
    padding: "4rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },

  main: {
    borderRadius: "25px",
    background: "858080",
    boxShadow: "35px 35px 61px #494646, -35px -35px 61px #c1baba",
    backgroundColor: "white",
    width: "70%",
    padding: "2rem",
    //      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "white",
    boxShadow: "inset 2px 5px 10px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease", // Use transition to smoothly change styles
  },

  inputFocus: {
    backgroundColor: "#ccc",
    transform: "scale(1.05)",
    boxShadow: "13px 13px 100px #969696, -13px -13px 100px #ffffff",
  },
};

function EditProfile() {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMaritalStatus, setUserMaritalStatus] = useState("");

  const { userDocument } = UserAuthContext();
  const { userData } = UserAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  const currentInterface = location.pathname.split("/")[1];

  const handleFocus1 = () => {
    // To handle focus of input form of Full Name
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    // To handle blur of input form of Full Name
    setIsFocused1(false);
  };

  const handleFocus2 = () => {
    // To handle focus of input form of Email
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    // To handle blur of input form of Email
    setIsFocused2(false);
  };

  const handleFocus3 = () => {
    // To handle focus of input form of Phone Number
    setIsFocused3(true);
  };

  const handleBlur3 = () => {
    // To handle blur of input form of Phone Number
    setIsFocused3(false);
  };

  const handleMaritalStatusChange = (event) => {
    setUserMaritalStatus(event.target.value);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    // Check the name attribute of the input field to determine which state to update
    if (name === "userName") {
      setUserName(value);
    } else if (name === "userAddress") {
      setUserAddress(value);
    } else if (name === "userPhone") {
      setUserPhone(value);
    }
  };

  const inputStyles1 = isFocused1
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;
  const inputStyles2 = isFocused2
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;
  const inputStyles3 = isFocused3
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;

  const updateUserProfile = async (
    userName,
    userAddress,
    userPhone,
    userMaritalStatus
  ) => {
    try {
      const userDocumentRef = doc(db, "User_Authentication", userDocument.id);
      const updatedData = {
        name: userName,
        address: userAddress,
        phone: userPhone,
        marital_status: userMaritalStatus,
      };
      updateDoc(userDocumentRef, updatedData);
      console.log("Document successfully updated!");
      alert("Document successfully updated!");
      navigate(`/${currentInterface}/ViewProfile`);
    } catch (error) {
      console.error("Error updating document: " + error);
      alert("Error updating document");
    }
  };

  const handleButtonClick = () => {
    // Get the updated user information
    const newUserName = userName;
    const newUserAddress = userAddress;
    const newUserPhone = userPhone;
    const maritalStatus = userMaritalStatus;

    updateUserProfile(newUserName, newUserAddress, newUserPhone, maritalStatus);
  };

  return (
    <div style={customStyles.container}>
      <div style={customStyles.main}>
        <header className="App-header">
          <h1 style={{ textAlign: "center" }}>Edit Profile</h1>

          <br></br>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                placeholder="Full Name"
                onFocus={handleFocus1}
                onBlur={handleBlur1}
                style={inputStyles1}
                value={userName}
                onChange={handleInput}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="userPhone"
                placeholder="Phone Number"
                onClick={handleFocus3}
                onBlur={handleBlur3}
                style={inputStyles3}
                value={userPhone}
                onChange={handleInput}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="userAddress"
                placeholder="Address"
                onClick={handleFocus2}
                onBlur={handleBlur2}
                style={inputStyles2}
                value={userAddress}
                onChange={handleInput}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="select"
                value={userMaritalStatus}
                onChange={handleMaritalStatusChange}
                style={{ width: "206px" }}
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </Form.Control>
            </Form.Group>

            <br></br>
            <br></br>

            <div>
              <Button
                variant="success"
                type="submit"
                onClick={handleButtonClick}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
          </Form>
        </header>
      </div>
    </div>
  );
}

export default EditProfile;
