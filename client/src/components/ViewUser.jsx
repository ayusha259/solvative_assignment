import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import "./CreateUser.css";
import UserForm from "./utils/UserForm";
import { useNavigate, useParams } from "react-router-dom";

const ViewUser = () => {
  const [error, setError] = useState(null);
  const router = useNavigate()
  const params = useParams()
  const [data, setData] = useState()
  const id = params['id']

  const handleGetUser = async () => {
    try {
        const result = await axios.get(`/api/${id}`);
        setData(result.data)
      } catch (error) {
        router("/")
      }
  }

  const handleEdit = async (name) => {
    setError(null);
    try {
      await axios.post(`/api/edit/${id}`, {
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
  
  useEffect(() => {
    handleGetUser()
  }, [id])
  return (
    <div className="cform-container">
      <h1>User</h1>
      {data ? <>
        <UserForm pre_name={data.name} handleSave={handleEdit} error={error} />
        <div className="view-buttons">
            <button onClick={() => router(`/${id}/p5`)}>P5 Balance: {data.p5_balance}</button>
            <button onClick={() => router(`/${id}/rewards`)}>Rewards: {data.rewards}</button>
        </div>
      </> : null}
    </div>
  );
};

export default ViewUser;
