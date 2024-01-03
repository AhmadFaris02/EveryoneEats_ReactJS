import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAuthContext from "./Login Page/UserAuthContext";
import { Button } from "react-bootstrap";
import { db } from "./Backend Firebase/FirebaseDatabase";
import { getDocs, collection, query, where } from "firebase/firestore";
import profilepic from "./default_profile_picture-removebg-preview.png";
import "./ViewProfile.css";

const customStyles = {
  // Define your custom styles here
  formControl: {
    width: "100%",
    marginBottom: "10px",
  },

  centerStyle: {
    display: "flex",
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
    alignItems: "center",
    height: "110vh",
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
    width: "100%",
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

  mainContent: {
    display: "flex",
  },

  inputFocus: {
    backgroundColor: "#ccc",
    transform: "scale(1.05)",
    boxShadow: "13px 13px 100px #969696, -13px -13px 100px #ffffff",
  },

  leftSection: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    textAlign: "center",
    borderRadius: "10px",
    marginRight: "20px",
  },

  rightSection: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    height: "70%",
  },

  TopRightSection: {
    height: "40%",
    backgroundColor: "#f8f8f8",
    padding: "10px",
    borderRadius: "10px",
  },

  bottomRightSection: {
    height: "30%",
    backgroundColor: "#f8f8f8",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  userInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
};

function ViewProfile() {
  const { userData } = UserAuthContext();
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Check if user data is available
        if (userData) {
          // Define a query to get donations by the current user
          const q = query(
            collection(db, "Food_Donation"),
            where("donor_name", "==", userData.name)
          );

          // Fetch the documents based on the query
          const querySnapshot = await getDocs(q);

          // Process the data and set it in the state
          const donations = querySnapshot.docs.map((doc) => ({
            food_name: doc.data().food_name,
            location: doc.data().location,
          }));
          setDonationData(donations);
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    // Call the fetchDonations function
    fetchDonations();
  }, [userData, db]);

  if (!userData) {
    // You might want to add some loading or fallback content here
    return <div>Loading...</div>;
  }

  const userName = userData.name;
  const userEmail = userData.email;
  const userPhone = userData.phone;
  const userAddress = userData.address;
  const userMaritalStatus = userData.marital_status;

  return (
    <div style={customStyles.container}>
      <div style={customStyles.main}>
        <h1 style={{ textAlign: "center" }}>User Profile</h1>

        {/* Main Content */}
        <div style={customStyles.mainContent}>
          {/* Left Section */}
          <div style={customStyles.leftSection}>
            {/* Content for the left section goes here */}
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#f8f8f8", // Set a background color to match the container
              }}
            >
              <img
                src={profilepic}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              />
            </div>
            {/* Display the name of the user */}
            <h5 style={{ marginTop: "10px" }}>{userData.name}</h5>
          </div>

          {/* Right Section */}
          <div style={customStyles.rightSection}>
            {/* Top Right Section */}
            <div style={customStyles.TopRightSection}>
              <div style={customStyles.userInfoRow}>
                <div>
                  <h6 className="mb-0">Name</h6>
                </div>
                <div className="text-secondary">{userName}</div>
              </div>
              <div style={customStyles.userInfoRow}>
                <div>
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="text-secondary">{userEmail}</div>
              </div>
              <div style={customStyles.userInfoRow}>
                <div>
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="text-secondary">{userPhone}</div>
              </div>
              <div style={customStyles.userInfoRow}>
                <div>
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="text-secondary">{userAddress}</div>
              </div>
              <div style={customStyles.userInfoRow}>
                <div>
                  <h6 className="mb-0">Marital Status</h6>
                </div>
                <div className="text-secondary">{userMaritalStatus}</div>
              </div>
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                {/* Use Link to wrap the button and specify the "to" attribute for redirection */}
                <Link to="../EditProfile">
                  <Button
                    variant="success"
                    type="submit"
                    className="text-right"
                  >
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bottom Right Section */}
            <div style={customStyles.bottomRightSection}>
              <h3 style={{ marginBottom: "20px" }}>Notification</h3>
              {/* Display donation information */}
              {donationData.map((donation, index) => (
                <p key={index}>
                  You have donated {donation.food_name} to {donation.location}.
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
