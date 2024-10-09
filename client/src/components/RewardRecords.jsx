import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import "./UserList.css";
import axios from "../lib/axios";

const RewardsRecords = () => {
  const [data, setData] = useState({
    rewards_balance: 0,
    rewards_history: []
  });
  const router = useNavigate()
  const params = useParams()
  const id = params['id']
  const getRecords = async () => {
    try {
        const records = await axios.get(`/api/rewards/${id}`);
        setData(records.data);
    } catch (error) {
        router('/')
    }
  };
  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="userlist-container">
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Created At</th>
            <th>Rewards</th>
            <th>Recieved By</th>
          </tr>
        </thead>
        <tbody>
          {data.rewards_history.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td> 
              <td>{new Date(record.created_at).toLocaleString()}</td>
              <td>{record.points}</td>
              <td>{record.given_by.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsRecords;
