import React, { useRef, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./map.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { db } from "../Backend Firebase/FirebaseDatabase";
import { addDoc, collection } from "firebase/firestore";
import { Marker } from "react-map-gl";

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
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#BDFFB1", // Change this to the color you prefer
    padding: "4rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    overflow: "auto",
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

function ApplyFoodbankLocation() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibXVoYW1hZC1hbXN5YXIiLCJhIjoiY2xvZmZoYjNxMG45YjJsczFjaXhna3d5dyJ9.cY5Pvmt4o_yX9sQqZY1thA";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(103.746128); // the location will be in Johor Bahru
  const [lat, setLat] = useState(1.488652);
  const [zoom, setZoom] = useState(9.5);

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [marker, setMarker] = useState(null);

  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const handleFocus3 = () => {
    setIsFocused3(true);
  };

  const handleBlur3 = () => {
    setIsFocused3(false);
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

  const addFoodbankLocation = async (
    locationName,
    locationAddress,
    locationPhoneNumber,
    marker
  ) => {
    try {
      const pendingLocationRef = collection(db, "Pending_Foodbank_Location");
      const docRef = await addDoc(pendingLocationRef, {
        location: locationName,
        address: locationAddress,
        phonenum: locationPhoneNumber,
        longitude: marker.getLngLat().lng,
        latitiude: marker.getLngLat().lat,
      });

      console.log("Document written with ID: ", docRef.id);
      alert("Your food bank location has been submitted");
    } catch (error) {
      console.error("Error adding the food bank location:", error);
      alert("Error adding the food bank location" + error.message);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "locationName") {
      setLocationName(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "phoneNum") {
      setPhoneNum(value);
    }
  };

  const handleButtonClick = () => {
    if (marker) {
      addFoodbankLocation(locationName, address, phoneNum, marker);
    } else {
      alert("Please add a marker on the map before submitting.");
    }
  };

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("click", (e) => {
      if (marker) {
        marker.remove();
      }

      const newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(e.lngLat)
        .addTo(map.current);

      setMarker(newMarker);
    });
  }, [marker]);

  return (
    <div style={customStyles.container}>
      <div style={customStyles.main}>
        <header className="App-header">
          <h1 style={{ textAlign: "center" }}>Apply Food Bank Location</h1>

          <br></br>
          <Form>
            <Form.Group>
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type="text"
                name="locationName"
                placeholder="E.g. : Taman Rakyat Lima"
                onFocus={handleFocus1}
                onBlur={handleBlur1}
                style={inputStyles1}
                onChange={handleInput}
                value={locationName}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="E.g. : Taman Perumahan Rakyat Lima Kedai 81300 Johor Bahru, Johor"
                onClick={handleFocus2}
                onBlur={handleBlur2}
                style={inputStyles2}
                onChange={handleInput}
                value={address}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNum"
                placeholder="E.g. : 012-3456789"
                onClick={handleFocus3}
                onBlur={handleBlur3}
                style={inputStyles3}
                onChange={handleInput}
                value={phoneNum}
              />
              <Form.Text className="text-muted" />
              <br></br>
            </Form.Group>

            <Form.Label>Pin Location</Form.Label>
            <div
              ref={mapContainer}
              className="map-container"
              style={{ transitionDuration: "200" }}
            />

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

export default ApplyFoodbankLocation;

// import React, { useRef, useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import "./map.css";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { db } from "../Backend Firebase/FirebaseDatabase";
// import { addDoc, collection } from "firebase/firestore";

// const inputStyle = {
//   width: "300px", // Adjust the width as needed
//   padding: "5px",
//   margin: "8px",
//   backgroundColor: "#ccc",
// };

// const customStyles = {
//   // Define your custom styles here
//   formControl: {
//     width: "100%",
//     marginBottom: "10px",
//   },

//   centerStyle: {
//     display: "flex",
//     flexDirection: "column", // To stack elements vertically
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },

//   button: {
//     backgroundColor: "#BDFFB1",
//     color: "white",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     border: "none",
//     cursor: "pointer",
//   },

//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     height: "100vh",
//     backgroundColor: "#BDFFB1", // Change this to the color you prefer
//     padding: "4rem",
//     boxShadow:
//       "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//     overflow: "auto",
//   },

//   main: {
//     borderRadius: "25px",
//     background: "858080",
//     boxShadow: "35px 35px 61px #494646, -35px -35px 61px #c1baba",
//     backgroundColor: "white",
//     width: "70%",
//     padding: "2rem",
//     //      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
//   },
//   input: {
//     width: "100%",
//     border: "none",
//     outline: "none",
//     borderRadius: "10px",
//     padding: "10px",
//     backgroundColor: "white",
//     boxShadow: "inset 2px 5px 10px rgba(0, 0, 0, 0.3)",
//     transition: "all 0.3s ease", // Use transition to smoothly change styles
//   },

//   inputFocus: {
//     backgroundColor: "#ccc",
//     transform: "scale(1.05)",
//     boxShadow: "13px 13px 100px #969696, -13px -13px 100px #ffffff",
//   },
// };

// function ApplyFoodbankLocation() {
//   mapboxgl.accessToken =
//     "pk.eyJ1IjoibXVoYW1hZC1hbXN5YXIiLCJhIjoiY2xvZmZoYjNxMG45YjJsczFjaXhna3d5dyJ9.cY5Pvmt4o_yX9sQqZY1thA";

//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(103.746128); // the location will be in Johor Bahru
//   const [lat, setLat] = useState(1.488652);
//   const [zoom, setZoom] = useState(9.5);

//   const [isFocused1, setIsFocused1] = useState(false);
//   const [isFocused2, setIsFocused2] = useState(false);
//   const [isFocused3, setIsFocused3] = useState(false);

//   const [locationName, setLocationName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNum, setPhoneNum] = useState("");

//   const handleFocus1 = () => {
//     // To handle focus of input form of Location Name
//     setIsFocused1(true);
//   };

//   const handleBlur1 = () => {
//     // To handle blur of input form of Location Name
//     setIsFocused1(false);
//   };

//   const handleFocus2 = () => {
//     // To handle focus of input form of Address
//     setIsFocused2(true);
//   };

//   const handleBlur2 = () => {
//     // To handle blur of input form of Address
//     setIsFocused2(false);
//   };

//   const handleFocus3 = () => {
//     // To handle focus of input form of Phone Number
//     setIsFocused3(true);
//   };

//   const handleBlur3 = () => {
//     // To handle blur of input form of Phone Number
//     setIsFocused3(false);
//   };

//   const inputStyles1 = isFocused1
//     ? { ...customStyles.input, ...customStyles.inputFocus }
//     : customStyles.input;
//   const inputStyles2 = isFocused2
//     ? { ...customStyles.input, ...customStyles.inputFocus }
//     : customStyles.input;
//   const inputStyles3 = isFocused3
//     ? { ...customStyles.input, ...customStyles.inputFocus }
//     : customStyles.input;

//   const addFoodbankLocation = async (
//     locationName,
//     locationAddress,
//     locationPhoneNumber
//   ) => {
//     try {
//       const pendingLocationRef = collection(db, "Pending_Foodbank_Location");
//       const docRef = await addDoc(pendingLocationRef, {
//         location: locationName,
//         address: locationAddress,
//         phonenum: locationPhoneNumber,
//       });

//       console.log("Document written with ID: ", docRef.id);
//       alert("Your food bank location has been submitted");
//     } catch (error) {
//       console.error("Error adding the food bank location:", error);
//       alert("Error adding the food bank location" + error.message);
//     }
//   };

//   const handleInput = (event) => {
//     const { name, value } = event.target;

//     // Check the name attribute of the input field to determine which state to update
//     if (name === "locationName") {
//       setLocationName(value);
//     } else if (name === "address") {
//       setAddress(value);
//     } else if (name === "phoneNum") {
//       setPhoneNum(value);
//     }
//   };

//   const handleButtonClick = () => {
//     addFoodbankLocation(locationName, address, phoneNum);
//   };

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });

//   return (
//     <div style={customStyles.container}>
//       <div style={customStyles.main}>
//         <header className="App-header">
//           <h1 style={{ textAlign: "center" }}>Apply Food Bank Location</h1>

//           <br></br>
//           <Form>
//             <Form.Group>
//               <Form.Label>Location Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="locationName"
//                 placeholder="E.g. : Taman Rakyat Lima"
//                 onFocus={handleFocus1}
//                 onBlur={handleBlur1}
//                 style={inputStyles1}
//                 onChange={handleInput}
//                 value={locationName}
//               />
//               <Form.Text className="text-muted" />
//               <br></br>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="address"
//                 placeholder="E.g. : Taman Perumahan Rakyat Lima Kedai 81300 Johor Bahru, Johor"
//                 onClick={handleFocus2}
//                 onBlur={handleBlur2}
//                 style={inputStyles2}
//                 onChange={handleInput}
//                 value={address}
//               />
//               <Form.Text className="text-muted" />
//               <br></br>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phoneNum"
//                 placeholder="E.g. : 012-3456789"
//                 onClick={handleFocus3}
//                 onBlur={handleBlur3}
//                 style={inputStyles3}
//                 onChange={handleInput}
//                 value={phoneNum}
//               />
//               <Form.Text className="text-muted" />
//               <br></br>
//             </Form.Group>

//             <Form.Label>Pin Location</Form.Label>
//             <div ref={mapContainer} className="map-container" style={{transitionDuration:"200"}}/>

//             <br></br>
//             <br></br>

//             <div>
//               <Button
//                 variant="success"
//                 type="submit"
//                 onClick={handleButtonClick}
//               >
//                 {" "}
//                 Submit{" "}
//               </Button>
//             </div>
//           </Form>
//         </header>
//       </div>
//     </div>
//   );
// }

// export default ApplyFoodbankLocation;
