import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    await axios.post("http://localhost:5000/api/users/add", form);
    fetchUsers();
    setForm({ username: "", email: "", phone: "" });
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Add User</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <br />

      <button onClick={addUser}>Submit</button>

      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.username} | {u.email} | {u.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
