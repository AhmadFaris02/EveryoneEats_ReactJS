import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Backend Firebase/FirebaseDatabase";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

function DeleteFoodbank() {
  const columns = [
    {
      name: "Location Name",
      selector: (row) => row.location,
      sortable: true,
      width: "200px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      width: "650px",
    },
    {
      name: "Phone Number",
      selector: (row) => row.phonenum,
      width: "130px",
    },
    {
      name: "Community Representative",
      selector: (row) => row.community,
      width: "200px",
    },
    {
      name: "Actions",
      width: "80px",
      cell: (row) => (
        <>
          {/* <MdEditDocument
            style={{ cursor: "pointer" }}
            title="Edit"
            onClick={() => handleEdit(row.id)} // Implement the handleEdit function
          /> */}
          <RiDeleteBin6Fill
            style={{ cursor: "pointer", marginLeft: "10px" }}
            title="Delete"
            onClick={() => handleDelete(row.id)} // Implement the handleDelete function
          />
        </>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Foodbank_Location"),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Ensure filteredData is set to the initial data on the first render
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const deleteLocation = async (id) => {
    const locationRef = doc(db, "Foodbank_Location", id);
    try {
      await deleteDoc(locationRef);
      console.log(
        `Location with ID ${id} deleted successfully from Firestore.`
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(`Delete location with ID: ${id}`);
    await deleteLocation(id);

    // Update local state to reflect the deletion
    setData((prevData) => prevData.filter((row) => row.id !== id));
    setFilteredData((prevFilteredData) =>
      prevFilteredData.filter((row) => row.id !== id)
    );
  };

  const handleFilter = (searchValue) => {
    if (searchValue.trim() === "") {
      setFilteredData(data); // Show all documents if search input is empty
    } else {
      setFilteredData(
        data.filter((row) =>
          row.location.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  };

  // const handleEdit = (id) => {
  //   // Implement the logic for editing a location
  //   console.log(`Edit location with ID: ${id}`);
  // };

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
      <div
        style={{
          borderRadius: "25px",
          background: "858080",
          boxShadow: "35px 35px 61px #494646, -35px -35px 61px #c1baba",
          backgroundColor: "white",
          padding: "2rem",
          width: "80%",
        }}
      >
        <h1 className="text-center p-4">Manage Location</h1>
        <div className="container mt-3 p-3 border rounded bg-light">
          <div className="text-end">
            <GoSearch style={{ marginRight: "5px" }} />
            <input
              type="text"
              placeholder="Search by Location Name"
              onChange={(e) => handleFilter(e.target.value)}
              className="mb-3"
            />
          </div>
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

export default DeleteFoodbank;
