import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Backend Firebase/FirebaseDatabase";
import Dropdown from "react-bootstrap/Dropdown";
import FeedbackCard from "./FeedbackCard";

const customStyles = {
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
    background: "#BDFFB1", // Set the background color to green or your desired color
    boxShadow: "35px 35px 61px #494646, -35px -35px 61px #c1baba",
    backgroundColor: "white",
    padding: "2rem",
    width: "50%",
    height: "80vh", // Adjust the height as needed
    maxHeight: "80vh", // Ensure a maximum height to prevent overflow
    overflow: "hidden", // Add a scrollbar if the content overflows
  },

  feedbackItem: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  },
};

const ViewFeedback = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsQuery = query(collection(db, "Foodbank_Location"));
        const querySnapshot = await getDocs(locationsQuery);
        const locationList = querySnapshot.docs.map(
          (doc) => doc.data().location
        );
        setLocations(locationList);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        let feedbacksQuery;

        if (selectedLocation) {
          feedbacksQuery = query(
            collection(db, "Feedback"),
            where("location", "==", selectedLocation)
          );
        } else {
          // If "All Locations" is selected, fetch all feedbacks
          feedbacksQuery = collection(db, "Feedback");
        }

        const querySnapshot = await getDocs(feedbacksQuery);
        const feedbackList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeedbackData(feedbackList);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [selectedLocation]);

  return (
    <div style={customStyles.container}>
      <div style={customStyles.main}>
        <h2 style={{ fontSize: "26px" }}>
          Feedback Received for {selectedLocation || "All Locations"}:
        </h2>

        {/* Bootstrap Dropdown for selecting a location */}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedLocation || "All Locations"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedLocation("")}>
              All Locations
            </Dropdown.Item>
            {locations.map((location) => (
              <Dropdown.Item
                key={location}
                onClick={() => setSelectedLocation(location)}
              >
                {location}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <div style={{ maxHeight: "50vh", overflowY: "auto", height: "100%" }}>
          <div>
            {feedbackData.length > 0 ? (
              feedbackData.map((feedback, index) => (
                <FeedbackCard
                  key={index}
                  locationName={feedback.location}
                  comment={feedback.comment}
                  rating={feedback.rating}
                />
              ))
            ) : (
              <p>No feedbacks for this location</p>
            )}
          </div>
        </div>
        <br></br>
        <Link to="../AddFeedback">
          <button>Go to Add Feedback</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewFeedback;
