import React, { useState, useEffect } from "react";
import { CreateProduct, ListProduct } from "../../api/product";
import Uploadfile from "../../components/admin/uploadfile";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const initalState = {
  title: "CPU",
  description: "description",
  price: 40,
  quantity: 20,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const ListProdct = useEcomStore((state) => state.ListProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState(initalState);
  // console.log(products);
  useEffect(() => {
    // code
    ListProdct(token, 20);
    getCategory(token);
  }, []);
  // console.log(categories);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      // code
      const res = await CreateProduct(token, form);
      console.log(res);
      toast.success(`เพิ่มสินค้าสำเร็จ ${res.data.product.title}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มขอมูลสินค้า</h1>
        <input
          className="border block mb-2"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border block mb-2"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          name="Description"
        />
        <input
          type="number"
          className="border block mb-2"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          name="price"
        />
        <input
          type="number"
          className="border block mb-2"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          name="quantity"
        />
        <select
          className="border block mb-2"
          name="categoryId"
          onChange={handleChange}
          value={form.categoryId}
          required
        >
          <option value="" disabled>
            Please Select Option
          </option>
          {categories.map((items, index) => (
            <option key={index} value={items.id}>
              {items.name}
            </option>
          ))}
        </select>
        <Uploadfile form={form} setForm={setForm}/>
        <hr />
        <button className="bg-blue-500">เพิ่มสินค้า</button>

        <hr />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Sold</th>
              <th scope="col">Quantity</th>
              <th scope="col">Update At</th>
            </tr>
          </thead>
          <tbody>
            {products.map((items, index) => {
              // console.log(items)
              return (
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{items.title}</td>
                  <td>{items.description}</td>
                  <td>{items.price}</td>
                  <td>{items.quantity}</td>
                  <td>{items.sold}</td>
                  <td>{items.updateAt}</td>
                  <td>
                    <p>Edit</p>
                    <p>Delete</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
