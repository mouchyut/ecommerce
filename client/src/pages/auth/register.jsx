import axios from "axios";
import React, { useState } from "react";
import { toast} from "react-toastify";
const Register = () => {
  // javascript
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    // code
    setForm({
      // key:value
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = form;
    if (password !== confirmPassword) {
      return alert("password is not match!!!");
    }
    console.log(form);
    // send to backend use axios
    try {
      // code
      const res = await axios.post("http://localhost:5000/api/register", form);
      console.log(res.data)
      toast.success(res.data.message); // ✅

    } catch (err) {
      // err
      const errMsg = err.response.data?.message
      toast.error(errMsg)
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        Email
        <input
          className="border"
          name="email"
          type="email"
          onChange={handleOnChange}
        />
        Password
        <input
          className="border"
          name="password"
          type="text"
          onChange={handleOnChange}
        />
        Confirm Password
        <input
          className="border"
          name="confirmPassword"
          type="text"
          onChange={handleOnChange}
        />
        <button className="bg-blue-500 rounded-md">Register</button>
      </form>
    </div>
  );
};

export default Register;
