import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Login Page/LoginPage";
import SignupPage from "./Login Page/SignupPage";
import DonorInterface from "./Donor Interface/DonorInterface";
import RecipientInterface from "./Recipient Interface/RecipientInterface";
import CommunityInterface from "./Community Interface/CommunityInterface";
import AdminInterface from "./Admin Interface/AdminInterface";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/SignupPage" element={<SignupPage />}></Route>
        <Route path="/DonorInterface" element={<DonorInterface />}></Route>
        <Route
          path="/RecipientInterface"
          element={<RecipientInterface />}
        ></Route>
        <Route
          path="/CommunityInterface"
          element={<CommunityInterface />}
        ></Route>
        <Route path="/AdminInterface" element={<AdminInterface />}></Route>
        <Route path="/ViewProfile" element={<ViewProfile />}></Route>
        <Route path="/EditProfile" element={<EditProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
