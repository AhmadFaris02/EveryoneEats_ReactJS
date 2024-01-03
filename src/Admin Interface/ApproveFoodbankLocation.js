import React, { useState, useEffect } from 'react'

// About database
import { collection, onSnapshot, getDoc, addDoc, deleteDoc, doc, updateDoc, Firestore} from "firebase/firestore";
import { db } from "../Backend Firebase/FirebaseDatabase";
import DataTable from "react-data-table-component";

//Import bootstrap
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ApproveFoodbankLocation() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([data]);

    // Fetch data from the database
    useEffect(() => {
        const unsubscribe = onSnapshot(
          collection(db, "Pending_Foodbank_Location"),
          (snapshot) => {
            const newData = snapshot.docs
                    .filter(doc => !('dummy' in doc.data())) // Exclude documents with the 'dummy' field
                    .map((doc) => ({ id: doc.id, ...doc.data() }));
                  
                  newData.forEach((data) => {
                    console.log('Processing document:', data);
                  });
            setData(newData);
            setFilteredData(newData); // Update filteredData with the new data
          }
        );
  
        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      }, []);
    

    // Handle the foodbank approval process
    const handleApproval = async(id) => {
        console.log(`Approve application of location with ID: ${id}`);
        await addLocation(id);    // add approved fooodbank into Foodbank_Location 
        await deleteLocation(id); // delete the approved foodbank from the Pending_Foodbank_Location

        // Update local state to reflect the deletion
        setData((prevData) => prevData.filter((row) => row.id !== id));
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((row) => row.id !== id)
        );
    }


    // Handle the foodbank rejection process
    const handleRejection = async(id) => {
        console.log(`Reject application of location with IDl: ${id}`);
        await deleteLocation(id); //Delete location from the pending_foodbank_location

        // Update local state to reflect the deletion
        setData((prevData) => prevData.filter((row) => row.id !== id));
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((row) => row.id !== id)
        );
    }

    // Add the approved foodbank into the Foodbank_Location
    const addLocation = async (id) => {
      const foodbankLocation = collection(db, 'Foodbank_Location'); // Reference to the Foodbank_Location
    
      // Reference to the pending food bank location document
      const pendingLocationRef = doc(db, "Pending_Foodbank_Location", id);
      try {
        // store the data of the selected Location
        const pendingLocationData = (await getDoc(pendingLocationRef)).data();
        
        // Add the pending location data into Foodbank Location
        await addDoc(foodbankLocation, pendingLocationData);
        console.log('The foodbank has been added to Foodbank Location');

      } catch (error) {
        console.error("Error adding the foodbank location:", error);
      }  
    }

    // Delete the rejected foodbank application from the Pending_Foodbank_Location
    const deleteLocation = async (id) => {
      const locationRef = doc(db, "Pending_Foodbank_Location", id);
      try {
        await deleteDoc(locationRef);
        console.log(
          `Location with ID ${id} deleted successfully from Firestore.`
        );  
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    };
    


    let columns = [];
       columns = [
          {
            name: "Location Name",
            selector: (row) => row.location,
            sortable: true,
            wrap: true,
            width: "200px",
          },
          {
            name: "Address",
            selector: (row) => row.address,
            sortable: true,
            wrap: true,
            width: "500px",
          },
          {
            name: "Phone Number",
            selector: (row) => (
              <a href={`tel:${row.phonenum}`}>{row.phonenum}</a>
            ),
            //selector: (row) => row.phonenum,
            width: "140px",
          },
          {
            name: "Community Representative",
            selector: (row) => row.community,
            width: "200px",
            wrap: true,
          
          },
        
          {
            width:"250px",
            name: "Pending Approval",
            button: true,
            width: "200px",
            cell: (row) => (
              <div style={{ display: "flex" }}>
                <Button variant="success" 
                        onClick={() => handleApproval(row.id)}
                        style={{ marginLeft: '3.5px', padding: '5px' }}
                        
                        // Text that will be displayed on the button
                        >Approve  
                </Button>
                
                <Button variant="danger" 
                        onClick={() => handleRejection(row.id)}
                        style={{ marginLeft: '3.5px', padding: '5px' }}
                        
                        // Text that will be displayed on the button
                        >Reject
                </Button>
              </div>
            ),
            
          },
          
          
        ];
      
  
    return (
      <div
          
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",       
        backgroundColor: "#BDFFB1",
      }}
    >
          <div>
                <div
                  style={{
                    borderRadius: "25px",
                    background: "858080",
                    boxShadow: "35px 35px 61px #494646, -35px -35px 61px #c1baba",
                    backgroundColor: "white",
                    padding: "2rem",
                    width: "100%",
                  }}
                >
                        <h1>
                          Pending Foodbank Location Approval
                        </h1>
                      <DataTable
                          columns={columns}
                          data={filteredData.filter(row => row.dummy !== true)} // to prevent the deletion of the collection
                          fixedHeader
                          pagination
                      />
                </div>
              
          </div>
      </div>
    )
}