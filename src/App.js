import './App.css';

import * as React from "react";
import { Link, Routes, Route, BrowserRouter, useNavigate, useLocation, Navigate } from "react-router-dom";

import useAuth from "./Components/useAuth"
import { Login } from "./Components/LoginComponent"
import PrimarySearchAppBar from "./Components/navBarComponent.js"
import HomeComponent from './Components/HomeComponent';
import Chat from './Components/Chat';

// const Home = () => <h1>Home (Public)</h1>;
const Pricing = () => <h1>Pricing (Public)</h1>;

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Settings = () => <h1>Settings (Private)</h1>;

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>;
}


function Nav() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (  
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
      </ul>
      {authed && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}


function App() {
  return (
  <BrowserRouter>
    {/* <Nav /> */}
    <PrimarySearchAppBar/>
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <Settings />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
