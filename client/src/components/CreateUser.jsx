import React, { useState } from "react";
import axios from "../lib/axios";
import "./CreateUser.css";
import UserForm from "./utils/UserForm";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [error, setError] = useState(null);
  const router = useNavigate()
  const handleSave = async (name) => {
    setError(null);
    try {
      await axios.post("/api/create-user", {
        name: name,
      });
      router("/")
    } catch (error) {
      if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <div className="cform-container">
      <h1>User</h1>
      <UserForm handleSave={handleSave} error={error} />
    </div>
  );
};

export default CreateUser;
