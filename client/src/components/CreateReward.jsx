import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import "./CreateUser.css";
import { useNavigate, useParams } from "react-router-dom";

const CreateUser = () => {
  const [error, setError] = useState(null);
  const [points, setPoints] = useState(0);
  const [data, setData] = useState({
    p5_balance: 0
  });
  const [selectedUser, setSelectedUser] = useState("")
  const router = useNavigate()
  const params = useParams()
  const current_id = params['id']
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const users = await axios.get("/api/");
    setUsers(users.data);
  };
  const getRecords = async () => {
    try {
        const records = await axios.get(`/api/p5/${current_id}`);
        setData(records.data);
    } catch (error) {
        router('/')
    }
  };
  const handleSave = async () => {
    setError(null);
    if(!points || points <= 0 || points > data.p5_balance) return
    if(!selectedUser) {
        setError("Please select a user")
        return
    }
    try {
        await axios.post(`/api/rewards/${current_id}/new`, {
            to: selectedUser,
            points: points
        });
        router("/")
    } catch (error) {
        if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
        } else {
        setError("Something went wrong");
        }
    }
  }
  useEffect(() => {
    getUsers()
    getRecords()
  }, [])
  return (
    <div className="cform-container">
      <h1>Create a reward</h1>
      <div onSubmit={() => {}} className='cform-wrapper'>
            <div>
                <label>Select User: </label>
                <select
                className="input"
                value={selectedUser}
                onChange={(e) => {setSelectedUser(e.target.value); setError(null)}}
                >
                <option value="">Select a User</option>
                {users
                    .filter((user) => user.id != current_id)
                    .map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                    ))}
                </select>
            </div>
            {error ? <p style={{color: "red"}}>{error}</p> : null}
            <input type="number" min={0} max={100} vlaue={points} onChange={(e) => setPoints(e.target.value)} />
            <p>Available Balance: {data.p5_balance}</p>
            <button disabled={points <= 0 || points > data.p5_balance} className='cform-button save' onClick={() => handleSave()}>Save</button>
        </div>
    </div>
  );
};

export default CreateUser;
