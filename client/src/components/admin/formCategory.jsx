import React, { useEffect, useState } from "react";
import {
  CreateCategory,
  ListCategory,
  RemoveCategory,
} from "../../api/category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  // javascript
  // get token from zustan
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [category, setCategory] = useState([]);
  const categories = useEcomStore((state)=>state.categories)
  const getCategory = useEcomStore((state)=>state.getCategory)

  // get category
  useEffect(() => {
    getCategory(token);
  }, []);

  // use globle state(store)
  // const getCategory = async (token) => {
  //   try {
  //     const res = await ListCategory(token);
  //     // console.log(res);
  //     setCategory(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    // code
    e.preventDefault(); //protect refrash page after we click submit
    // console.log(name,token);
    if (!name) {
      return toast.warning("Please create data!!!");
    }
    try {
      // code
      const res = await CreateCategory(token, { name });
      getCategory(token);
      console.log(res);
      toast.success("Create Successfull!!!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
      // code
    console.log(id);
    try {
      // code
      const res = await RemoveCategory(token, id);
      console.log(res);
      toast.success(`Delete Sucessfull ${res.data.name}`);
      getCategory(token, id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-500">Add Category</button>
      </form>
      <hr />

      <ul className="list-none">
        {categories.map((items, index) => (
          <li className="flex justify-between my-2" key={index}>
            <span>{items.name}</span>
            <button
              className="bg-red-500 rounded"
              onClick={() => handleRemove(items.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
