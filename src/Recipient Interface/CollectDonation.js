import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for styling the date picker
import "react-time-picker/dist/TimePicker.css"; // Import the CSS for styling the time picker
import Dropdown from "react-bootstrap/Dropdown"; // Import the dropdown from bootstrap
import { Button, Form } from "react-bootstrap";

import { db } from "../Backend Firebase/FirebaseDatabase";
import { getDocs } from "firebase/firestore";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

import { deleteDoc } from "firebase/firestore";

// import {onSnapshot, CollectDon} from "firebase/firestore";
//import {get, ref} from 'firebase';
// import {useEffect, useState } from 'react';
// import {database} from './firebaseConfig';

// sini
/*
const fetchData = async () => {
  const foodItemsCollection = collection(db, 'Food_Donation');
  const querySnapshot = await getDocs(foodItemsCollection);

  const data = querySnapshot.docs.map((doc) => doc.data());
  console.log ('Fetched Data:', data);
};
fetchData();
*/

//const [data, setData] = useState([]);

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
    height: "90vh",
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

function CollectDonation() {
  const [selectedTime, setSelectedTime] = useState("12:00"); // Initialize with a default time
  const [selectedDate, setSelectedDate] = useState(null); // Initialize with no date selected
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [availableFoods, setAvailableFoods] = useState([]);

  const [value, setValue] = useState("");
  const [selects, setSelects] = useState();

  //selectedFood - will store the name of the selected food after user choose their food from the dropdown item of foodlist
  const [selectedFood, setSelectedFood] = useState(null);
  const handleFoodSelection = (foodName) => {
    setSelectedFood(foodName);
  };

  // will show the selected food after user select their selected food to receive
  useEffect(() => {
    console.log("Selected Food", selectedFood);
  }, [selectedFood]);

  //sini
  /* const [locations, setLocations] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          const querySnapshot = await getDocs(Food_Donation(db, 'location'));
          const newLocations = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setLocations(newLocations);
        };

        fetchData();
        }, []); // Run the effect only once when the component mounts
        */

  // Fetch data from the database
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        //tukar ni jadi food_donation
        const querySnapshot = await getDocs(
          collection(db, "Foodbank_Location")
        );
        const locationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locationData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        if (selectedLocation) {
          const querySnapshot = await getDocs(collection(db, "Food_Donation"));
          const foodData = querySnapshot.docs
            .filter((doc) => doc.data().location === selectedLocation.location)
            .map((doc) => ({ id: doc.id, ...doc.data() }));

          setAvailableFoods(foodData);
        } else {
          // Handle the case where no location is selected
          setAvailableFoods([]);
        }
      } catch (error) {
        console.error("Error fetching food name:", error);
      }
    };

    fetchFood();
  }, [selectedLocation]);

  const formRef = useRef(null);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLocationSelection = async (location) => {
    setSelectedLocation(location);
    console.log("Selected location:", location);
  };

  // This useEffect will be executed after the selected Location has been changed, hence, it will reload the page after it execute
  // and user can now see the dropdown item of food list at that location
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming 'food_donation' is the collection name
        const foodDonationRef = collection(db, "Food_Donation");

        // Assuming 'location' is the field you want to query against in 'Food_Donation'
        const q = query(
          foodDonationRef,
          where("location", "==", selectedLocation)
        );

        const querySnapshot = await getDocs(q);

        // Extract the food_name values from the query snapshot
        const foodNames = querySnapshot.docs.map((doc) => doc.data().food_name);

        // Set availableFoods to the food_name array of the selected location
        setAvailableFoods(foodNames);
      } catch (error) {
        console.error("Error fetching food names:", error);
      }
    };

    if (selectedLocation) {
      fetchData();
    }
  }, [selectedLocation]);

  const handleButtonClick = async () => {
    console.log("Selected Time:", selectedTime);
    console.log("Selected Time:", selectedTime);
    console.log("Selected Location:", selectedLocation);
    console.log("Selected Food before deletion:", selectedFood);
    deleteFood();

    // Additional logic after deleting the food (replace this with your specific logic)
    console.log("Additional logic after deleting the food");
  };

  const deleteFood = async () => {
    try {
      // Check if a food is selected
      if (selectedFood) {
        // Reference to the document in the 'Food_Donation' collection
        const querySnapshot = await getDocs(
          query(
            collection(db, "Food_Donation"),
            where("food_name", "==", selectedFood)
          )
        );

        // Delete each document that matches the query
        const deletionPromises = querySnapshot.docs.map(async (doc) => {
          const foodDocRef = doc(db, "Food_Donation", doc.id);
          await deleteDoc(foodDocRef);
          console.log(
            `Successfully deleted document with food_name ${selectedFood} from the database.`
          );
        });

        // Wait for all deletions to complete
        await Promise.all(deletionPromises);
      } else {
        // Log a message if no food is selected
        console.log("No food selected to delete.");
      }
    } catch (error) {
      // Log an error if there's an issue with deletion
      console.error("Error deleting food:", error);
    }
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

  const inputStyles1 = isFocused1
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;
  const inputStyles2 = isFocused2
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;

  const showMessage = () => {
    alert("Your info have been submitted");
  };

  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={customStyles.container}>
      <div style={customStyles.main}>
        <header className="App-header">
          <h1>Collect Food Donation</h1>

          <br></br>
          <Form>
            {/* Foodbank Location */}
            <Form.Group>
              <Dropdown
                onSelect={(eventKey) => handleLocationSelection(eventKey)}
              >
                <Dropdown.Toggle variant="secondary" style={{ width: "206px" }}>
                  {selectedLocation ? selectedLocation : "Foodbank Location"}{" "}
                  {/* What the user will see */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {locations.map((location) => (
                    <Dropdown.Item
                      key={location.id}
                      eventKey={location.location}
                    >
                      {location.location}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <br></br>

            <Form.Group>
              <Dropdown onSelect={(eventKey) => handleFoodSelection(eventKey)}>
                <Dropdown.Toggle variant="secondary" style={{ width: "206px" }}>
                  {selectedFood ? selectedFood : "Food List"}{" "}
                  {/* What the user will see */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {availableFoods.map((foodName, index) => (
                    <Dropdown.Item key={index} eventKey={foodName}>
                      {foodName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <br></br>

            {/* Dah siap */}
            <Form.Label>Pickup Date: </Form.Label>
            <br></br>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select Pickup Date"
              dateFormat="dd/MM/yyyy"
              className="form-control"
              style={{ inputStyle, margin: "10px" }} // You can adjust the style to match the input fields
            />

            <br></br>
            <br></br>

            <div>
              <Button variant="success" type="submit" onClick={deleteFood}>
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

export default CollectDonation;
