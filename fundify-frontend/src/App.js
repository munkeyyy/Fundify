import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Common/NavBar/Navbar";
import MutualFunds from "./Components/MutualFunds/MutualFunds";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import LoginProvider from "./context/Login/LoginProvider";
import UserProvider from "./context/User/UserProvider";
import Auth from "./Components/Auth/Auth";
import { useContext } from "react";
import { LoginContext } from "./context/Login/LoginContext";
import ProtectedRoute from "./Components/ProtectedRoute";

// import Public from "./Components/Public";

function App() {
  // const{isLoggedIn}=useContext(LoginContext)
  return (
    <LoginProvider>
      <UserProvider>
        <div className="App">
          {/* {<Navbar />} */}
          <Routes>

            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<MutualFunds />} />
            </Route>

            <Route path="/login" element={<Auth />} />
          </Routes>
        </div>
      </UserProvider>
    </LoginProvider>
  );
}

export default App;
