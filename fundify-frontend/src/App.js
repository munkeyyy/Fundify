import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Common/NavBar/Navbar";
import MutualFunds from "./Components/MutualFunds/MutualFunds";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

// import Public from "./Components/Public";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MutualFunds/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
