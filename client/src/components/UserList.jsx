import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import "./UserList.css";
import axios from "../lib/axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const router = useNavigate()
  const getUsers = async () => {
    const users = await axios.get("/api/");
    setUsers(users.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="userlist-container">
      <div className="userlist-header">
        <h2>User Table</h2>{" "}
        <button onClick={() => router('/new')}>Create New User</button>
      </div>
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.p5_balance}</td>
              <td>{user.rewards}</td>
              <td>
                <button onClick={() => router(`/${user.id}`)}>Login</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
