import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = new URLSearchParams(window.location.search).get("token");
      localStorage.setItem("token",token)

      if (token) {
        try {
          const response=await axios.get('http://localhost:3000/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`
          }})
          
          setUser(response.data);
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    }

    fetchUserData(); 
  }, []);
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      const token=localStorage.getItem("token")
      const response=await axios.get('http://localhost:3000/user/logout', {
        headers: {
          Authorization: `Bearer ${token}`
      }})
      setUser(null);
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  if (user) {
    return (
      <div className="m-4 text-center bg-gray-400 container mx-auto px-4 py-8 rounded-lg">
        <div className="flex flex-col gap-4 items-center ">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.displayName}!</h2>
          <p className=" text-lg text-gray-600">Email: {user.email}</p>
          <p className=" text-lg text-gray-600">Google ID:{user.googleId}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white w-24 h-8 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return null; // Return null or some other fallback if no user is present
}

export default Dashboard;
