import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // Correct import
import "mapbox-gl/dist/mapbox-gl.css";
import "./ViewFoodbankLocation.css";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./Backend Firebase/FirebaseDatabase";
//import { db } from "./firebase";
import DataTable from "react-data-table-component";

// Access token. Used when want to render the map
mapboxgl.accessToken =
  "pk.eyJ1IjoibXVoYW1hZC1hbXN5YXIiLCJhIjoiY2xvZmZoYjNxMG45YjJsczFjaXhna3d5dyJ9.cY5Pvmt4o_yX9sQqZY1thA";

export default function ViewFoodbankLocation() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9.5);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([data]);

  // The coordinate will be set to Johor Bahru
  const [lng, setLng] = useState(103.746128);
  const [lat, setLat] = useState(1.488652);

  const customStyles = {
    row: {
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      marginLeft: "-5px",
      marginRight: "-5px",

      //display: 'flex',
      //flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center",
      height: "20vh",
    },
  };

  // Fetch data from the database
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Foodbank_Location"), // name of the collection
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
        setFilteredData(newData); // Update filteredData with the new data

        newData.forEach((item) => showMarker(item.longitude, item.latitude)); // Show all the foodbank location on the map
        console.log("Showing all the foodbank location on the map");
      }
    );

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to show marker all foodbank location registered onto the map
  const showMarker = (longitude, latitude) => {
    const markerLocation = [longitude, latitude];

    new mapboxgl.Marker().setLngLat(markerLocation).addTo(map.current);

    // Fly to the marker location
    map.current.flyTo({
      zoom: 9.5,
      center: markerLocation,
      essential: true, //To prevent user from canceling the animation/interaction
    });
  };

  // Function to fly to the location of the selected foodbank
  const jumpToLocation = (longitude, latitude) =>
    // Fly to the marker location
    map.current.flyTo({
      zoom: 16,
      center: [longitude, latitude],
      essential: true, //Ensures that this animation is considered essential and not canceled by user interactions
    });

  /*To render the map into the website */
  useEffect(() => {
    if (map.current) return; // If there is a map rendered in the website, it will exit the function

    map.current = new mapboxgl.Map({
      //Will render the map if there is no map displayed in the page
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", // Can change the style of the mapbox - just change the link
      center: [lng, lat],
      zoom: zoom,
    });

    // The default centered location when the map is rendered
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // Table to display all the foodbank in the database with its information
  const columns = [
    {
      // Column 1
      name: "Location Name",
      selector: (row) => row.location,
      sortable: true,
      wrap: true,
      width: "200px",
    },
    {
      // Column 2
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      wrap: true,
      width: "500px",
    },
    {
      name: "Phone Number",
      selector: (row) => (
        <a
          href={`tel:+6${row.phonenum}`}
          //href={`https://api.whatsapp.com/send?text=Hello&phone=+6${encodeURIComponent(row.phonenum)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      ),
      // width: "130px",
    },
    {
      // Column 4
      name: "Community Representative",
      selector: (row) => row.community,
      // width: "170px",
      wrap: true,
    },
    {
      // Column 5
      name: "Show Location",
      cell: (row) => (
        <button onClick={() => jumpToLocation(row.longitude, row.latitude)}>
          Show Location
        </button>
      ),
      // width: "130px",
    },
  ];

  /*The actual Code */
  return (
    <div>
      <div style={customStyles.row} className="row">
        {/*Map Section */}
        <div className="MapInformation">
          <div className="mapDetailsOverlay">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>

        <br></br>
        <br></br>

        {/*Foodbank Location Section */}
        <div className="FoodbankInformation">
          <h1>Foodbank List</h1>
          <DataTable
            columns={columns}
            data={filteredData}
            fixedHeader
            pagination
          />
        </div>
      </div>
    </div>
  );
}
