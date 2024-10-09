import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import "./UserList.css";
import axios from "../lib/axios";

const P5Records = () => {
  const [data, setData] = useState({
    p5_balance: 0,
    p5_history: []
  });
  const router = useNavigate()
  const params = useParams()
  const id = params['id']
  const getRecords = async () => {
    try {
        const records = await axios.get(`/api/p5/${id}`);
        setData(records.data);
    } catch (error) {
        router('/')
    }
  };
  const deleteP5 = async (created_at) => {
    try {
         await axios.post(`/api/delete`, {
            created_at: created_at,
            given_by: id
        });
        router(`/${id}`)
    } catch (error) {
        router('/')
    }
  };
  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="userlist-container">
        <button onClick={() => router(`/${id}/rewards/new`)}>New Reward</button>
        <h3 style={{margin: "10px 0"}}>Current Balance: {data.p5_balance}</h3>
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Created At</th>
            <th>P5 Amount</th>
            <th>Given By</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.p5_history.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td> 
              <td>{new Date(record.created_at).toLocaleString()}</td>
              <td>{record.points}</td>
              <td>{record.given_to.name}</td>
              <td>
                <button onClick={() => deleteP5(record.created_at)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P5Records;
