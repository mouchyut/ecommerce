import axios from "axios";

export const CreateProduct = async (token, form) => {
  // code

  return axios.post("http://localhost:5000/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const ListProduct = async (token, count = 20) => {
  // code

  return axios.get("http://localhost:5000/api/products/" + count, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const Uploadfiles = async (token, form) => {
  // code
  return axios.post(
    "http://localhost:5000/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const Removefiles = async (token, public_id) => {
  // code
  return axios.post(
    "http://localhost:5000/api/removeImages",
    {
      public_id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
