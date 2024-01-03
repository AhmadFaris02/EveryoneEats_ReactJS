import React, { useState, useRef, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./Backend Firebase/FirebaseDatabase"; // Import your Firebase configuration
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Form } from "react-bootstrap";
import RatingSelect from "./RatingSelect";
import AddFeedbackCard from "./AddFeedbackCard";

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
    backgroundColor: "green",
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
    height: "100%",
    backgroundColor: "#BDFFB1",
    padding: "4rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    overflowY: "auto",
  },

  main: {
    borderRadius: "25px",
    boxShadow: "35px 35px 61px #494646, -35px -35px 61px #c1baba",
    backgroundColor: "white",
    padding: "2rem",
    width: "50%",
    height: "80vh", // Adjust the height as needed
    maxHeight: "80vh", // Ensure a maximum height to prevent overflow
    overflow: "hidden", // Add a scrollbar if the content overflows
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

  feedbackItem: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },

  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },

  deleteIcon: {
    marginLeft: "10px",
    cursor: "pointer",
  },
};

const FeedbackList = ({ feedbackData, onDelete }) => (
  <div style={{ maxHeight: "500px", overflowY: "auto" }}>
    <h2 style={{ fontSize: "26px" }}>Feedback Provided</h2>
    {feedbackData.map((feedback, index) => (
      <AddFeedbackCard
        key={index}
        locationName={feedback.location}
        comment={feedback.comment}
        rating={feedback.rating}
        onDelete={onDelete && (() => onDelete(feedback))}
      />
    ))}
  </div>
);

const AddFeedback = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [comment, setComment] = useState("");
  const [isFocused2, setIsFocused2] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackData, setFeedbackData] = useState([]);

  const formRef = useRef(null);

  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const inputStyles2 = isFocused2
    ? { ...customStyles.input, ...customStyles.inputFocus }
    : customStyles.input;

  const showMessage = () => {
    alert("Your info has been submitted");
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "Foodbank_Location")
        );
        const locationsData = [];
        querySnapshot.forEach((doc) => {
          locationsData.push(doc.data().location);
        });
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const fetchFeedback = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Feedback"));
      const feedbackList = [];
      querySnapshot.forEach((doc) => {
        feedbackList.push({ id: doc.id, ...doc.data() });
      });
      return feedbackList;
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadFeedback = async () => {
      const updatedFeedbackList = await fetchFeedback();
      setFeedbackData(updatedFeedbackList);
    };

    loadFeedback();
  }, []);

  const handleLocationChange = (eventKey) => {
    setSelectedLocation(eventKey);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add a new document to the "Feedback" collection.
      const docRef = await addDoc(collection(db, "Feedback"), {
        location: selectedLocation,
        comment: comment,
        rating: selectedRating,
      });

      console.log("Document written with ID: ", docRef.id);
      // Reset the form or show a thank you message.
      setSelectedLocation("");
      setComment("");
      setSelectedRating(0);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async (feedback) => {
    try {
      // Implement the delete functionality by deleting the Firestore document
      const querySnapshot = await getDocs(collection(db, "Feedback"));
      querySnapshot.forEach(async (doc) => {
        if (
          doc.data().location === feedback.location &&
          doc.data().rating === feedback.rating &&
          doc.data().comment === feedback.comment
        ) {
          await deleteDoc(doc.ref);
          console.log("Feedback deleted successfully");
          // Remove the deleted feedback from the state
          setFeedbackData((prevFeedback) =>
            prevFeedback.filter((item) => item !== feedback)
          );
        }
      });
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div style={customStyles.container}>
      <div style={customStyles.main}>
        <header className="App-header">
          <h1 style={{ fontSize: "26px" }}>Add Feedback For a Location</h1>

          <Form>
            <Form.Group>
              <Form.Label>Select Location</Form.Label>
              <Dropdown onSelect={handleLocationChange}>
                <Dropdown.Toggle variant="secondary" style={{ width: "206px" }}>
                  {selectedLocation || "Location"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {locations.map((location, index) => (
                    <Dropdown.Item key={index} eventKey={location}>
                      {location}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <br></br>

            <Form.Group>
              <Form.Label>What do you think?</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Comment here"
                onClick={handleFocus2}
                onBlur={handleBlur2}
                style={inputStyles2}
                onChange={handleCommentChange}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Group>
              <Form.Label>Rate your experience:</Form.Label>
              <RatingSelect
                selected={selectedRating}
                select={setSelectedRating}
              />
            </Form.Group>

            <br></br>

            <div>
              <Button variant="success" type="submit" onClick={handleSubmit}>
                {" "}
                Submit{" "}
              </Button>
            </div>
          </Form>
        </header>
      </div>

      <br></br>

      <div style={customStyles.main}>
        {" "}
        <FeedbackList feedbackData={feedbackData} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AddFeedback;
