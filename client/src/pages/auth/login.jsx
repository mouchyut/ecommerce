/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { toast} from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate()
  const actionLogin =useEcomStore((state)=>state.actionLogin)
  const user = useEcomStore((state)=>state.user)
  console.log("user from zustand",user)
  // console.log(actionLogin)
  // javascript
  const [form, setForm] = useState({
    email: "",
    password: "",
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
    try{
      const res = await actionLogin(form)
      // console.log(res)
      const role = res.data.payload.role
      console.log(role)
      // rediract and check role user or role admin
      roleRediract(role)
      console.log("User after login:", useEcomStore.getState().user);
      toast.success("Login Successfully!!!")
    }catch(err){
      console.log(err)
      const errMsg= err.response?.data?.message
      toast.error(errMsg)
    }
  };

  const roleRediract =(role)=>{
    if (role === 'admin'){
      navigate('/admin')
    }else {
      navigate('/user')
    }
  }
  return (
    <div>
      <h1>Login</h1>

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
        <button className="bg-blue-500 rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;
