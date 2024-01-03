import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Backend Firebase/FirebaseAuth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../Backend Firebase/FirebaseDatabase";

function UserAuthContext() {
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDocument, setUserDocument] = useState(null);

  const getLocations = async () => {
    const locationsCollection = collection(db, "Foodbank_Location"); // Replace with your collection name
    const locationsSnapshot = await getDocs(locationsCollection);
    const locationsData = [];

    locationsSnapshot.forEach((doc) => {
      const locationData = doc.data();
      locationsData.push(locationData.location);
    });

    return locationsData;
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);

        // Now that the user is signed in, fetch the user's data from Firestore
        const userRef = doc(db, "User_Authentication", user.uid);

        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const currentUserDocument = userDoc;
            const currentUserData = userDoc.data();
            setUserData(currentUserData); // Store the user data in the component's state
            setUserDocument(currentUserDocument);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  return {
    userData,
    getLocations,
    userDocument,
    logout,
  };
}

export default UserAuthContext;

// import { onAuthStateChanged } from "firebase/auth";
// import React, { useEffect, useState } from "react";
// import { auth } from "../Backend Firebase/FirebaseAuth";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../Backend Firebase/FirebaseDatabase";

// function UserAuthContext() {
//   const [authUser, setAuthUser] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const listen = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setAuthUser(user);

//         // Now that the user is signed in, fetch the user's document ID from Firestore
//         const userRef = doc(db, "User_Authentication", user.uid);

//         try {
//           const userDoc = await getDoc(userRef);
//           if (userDoc.exists()) {
//             //const userDocumentId = userDoc.id;

//             // You can use userDocumentId here or set it in your component's state
//             console.log("User Document ID:", userDoc.data());
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         setAuthUser(null);
//       }
//     });
//   }, []);

//   return <div>{authUser ? <p>Signed In</p> : <p>Signed Out</p>}</div>;
// }

// export default UserAuthContext;
