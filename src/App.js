import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Login Page/LoginPage";
import SignupPage from "./Login Page/SignupPage";
import DonorInterface from "./Donor Interface/DonorInterface";
import RecipientInterface from "./Recipient Interface/RecipientInterface";
import CommunityInterface from "./Community Interface/CommunityInterface";
import AdminInterface from "./Admin Interface/AdminInterface";
import Homepage from "./Homepage";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import ViewFoodbankLocation from "./ViewFoodbankLocation";
import AddDonation from "./Donor Interface/AddDonation";
import CollectDonation from "./Recipient Interface/CollectDonation";
import ApplyFoodbankLocation from "./Community Interface/ApplyFoodbankLocation";
import DeleteFoodbank from "./Admin Interface/DeleteFoodbank";
import ApproveFoodbankLocation from "./Admin Interface/ApproveFoodbankLocation";
import ViewFeedback from "./ViewFeedback";
import AddFeedback from "./AddFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/SignupPage" element={<SignupPage />}></Route>
        <Route path="/DonorInterface/*" element={<DonorInterface />}>
          <Route index element={<Homepage />}></Route>
          <Route path="Homepage" element={<Homepage />}></Route>
          <Route path="AddDonation" element={<AddDonation />}></Route>
          <Route path="ViewFeedback" element={<ViewFeedback />}></Route>
          <Route path="AddFeedback" element={<AddFeedback />}></Route>
          <Route path="ViewProfile" element={<ViewProfile />}></Route>
          <Route path="EditProfile" element={<EditProfile />}></Route>
          <Route
            path="ViewFoodbankLocation"
            element={<ViewFoodbankLocation />}
          ></Route>
        </Route>
        <Route path="/RecipientInterface/*" element={<RecipientInterface />}>
          <Route index element={<Homepage />}></Route>
          <Route path="Homepage" element={<Homepage />}></Route>
          <Route path="CollectDonation" element={<CollectDonation />}></Route>
          <Route path="ViewFeedback" element={<ViewFeedback />}></Route>
          <Route path="AddFeedback" element={<AddFeedback />}></Route>
          <Route path="ViewProfile" element={<ViewProfile />}></Route>
          <Route path="EditProfile" element={<EditProfile />}></Route>
          <Route
            path="ViewFoodbankLocation"
            element={<ViewFoodbankLocation />}
          ></Route>
        </Route>
        <Route path="/CommunityInterface/*" element={<CommunityInterface />}>
          <Route index element={<Homepage />}></Route>
          <Route path="Homepage" element={<Homepage />}></Route>
          <Route
            path="ApplyFoodbankLocation"
            element={<ApplyFoodbankLocation />}
          ></Route>
          <Route path="ViewFeedback" element={<ViewFeedback />}></Route>
          <Route path="AddFeedback" element={<AddFeedback />}></Route>
          <Route path="ViewProfile" element={<ViewProfile />}></Route>
          <Route path="EditProfile" element={<EditProfile />}></Route>
          <Route
            path="ViewFoodbankLocation"
            element={<ViewFoodbankLocation />}
          ></Route>
        </Route>
        <Route path="/AdminInterface/*" element={<AdminInterface />}>
          <Route index element={<Homepage />}></Route>
          <Route path="Homepage" element={<Homepage />}></Route>
          <Route
            path="ApproveFoodbankLocation"
            element={<ApproveFoodbankLocation />}
          ></Route>
          <Route path="DeleteLocation" element={<DeleteFoodbank />}></Route>
          <Route
            path="ViewFoodbankLocation"
            element={<ViewFoodbankLocation />}
          ></Route>
          <Route path="ViewFeedback" element={<ViewFeedback />}></Route>
          <Route path="AddFeedback" element={<AddFeedback />}></Route>
          <Route path="ViewProfile" element={<ViewProfile />}></Route>
          <Route path="EditProfile" element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
