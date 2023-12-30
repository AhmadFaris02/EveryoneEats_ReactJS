import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for styling the date picker
import "react-time-picker/dist/TimePicker.css"; // Import the CSS for styling the time picker
import Dropdown from "react-bootstrap/Dropdown"; // Import the dropdown from bootstrap
import { Button, Form } from "react-bootstrap";
import UserAuthContext from "../Login Page/UserAuthContext";
import { useEffect } from "react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../Backend Firebase/FirebaseDatabase";

const inputStyle = {
  width: "300px", // Adjust the width as needed
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

function AddDonation() {
  const [selectedDate, setSelectedDate] = useState(null); // Initialize with no date selected
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const { userData } = UserAuthContext();

  const { getLocations } = UserAuthContext();

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");

  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFocus1 = () => {
    // To handle focus of input form of Food Name
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    // To handle blur of input form of Food Name
    setIsFocused1(false);
  };

  const handleFocus2 = () => {
    // To handle focus of input form of Food Description
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    // To handle blur of input form of Food Description
    setIsFocused2(false);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    // Check the name attribute of the input field to determine which state to update
    if (name === "foodName") {
      setFoodName(value);
    } else if (name === "foodDescription") {
      setFoodDescription(value);
    }
  };

  const inputStyles1 = isFocused1
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;
  const inputStyles2 = isFocused2
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;

  // const showMessage = () => {
  //   alert("Your info have been submitted");
  // };

  const addFoodInformation = async (
    foodName,
    foodDescription,
    expiryDate,
    selectedLocation,
    donorName
  ) => {
    try {
      const foodCollectionRef = collection(db, "Food_Donation"); // Reference to the "Food_Donation" collection
      const docRef = await addDoc(foodCollectionRef, {
        food_name: foodName,
        food_description: foodDescription,
        expiry_date: expiryDate,
        location: selectedLocation,
        donor_name: donorName,
        donation_date: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      alert("Your info has been submitted");
    } catch (error) {
      console.error("Error adding food information:", error);
      alert("Error adding food information: " + error.message);
    }
  };

  const handleLocationSelect = (locationName) => {
    setSelectedLocation(locationName); // Update selectedLocation when an item is clicked
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locationData = await getLocations();
      setLocations(locationData);
    };

    fetchLocations();
  }, []);

  const handleButtonClick = () => {
    // Get the food information and donor name
    const foodNameValue = foodName; // Get the food name from the input field
    const foodDescriptionValue = foodDescription; // Get the food description from the input field
    const expiryDate = selectedDate; // Use the selected date
    const donorName = userData.name; // Use the donor's name from the context

    // Call the function to add the food information to Firestore
    addFoodInformation(
      foodNameValue,
      foodDescriptionValue,
      expiryDate,
      selectedLocation,
      donorName
    );

    // Clear or reset the form fields if needed
    // ...
  };

  return (
    <div style={customStyles.container}>
      <div style={customStyles.main}>
        <header className="App-header">
          <h1>Add Food Information</h1>

          <br></br>
          <Form>
            <Form.Group>
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                name="foodName"
                placeholder="Food Name"
                onFocus={handleFocus1}
                onBlur={handleBlur1}
                style={inputStyles1}
                value={foodName}
                onChange={handleInput}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Group>
              <Form.Label>Food Description</Form.Label>
              <Form.Control
                type="text"
                name="foodDescription"
                placeholder="Description"
                onClick={handleFocus2}
                onBlur={handleBlur2}
                style={inputStyles2}
                value={foodDescription}
                onChange={handleInput}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Label>Expiry Date: </Form.Label>
            <br></br>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select Expiry Date"
              dateFormat="dd/MM/yyyy"
              className="form-control"
              style={{ inputStyle, margin: "10px" }} // You can adjust the style to match the input fields
            />

            <br></br>
            <br></br>

            <Form.Group>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" style={{ width: "206px" }}>
                  {selectedLocation}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {locations.map((locationName, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleLocationSelect(locationName)}
                    >
                      {locationName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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

export default AddDonation;
