import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { Uploadfiles, Removefiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
const uploadfile = ({ form, setForm }) => {
  const [loading, setLoading] = useState(false);
  const token = useEcomStore((state) => state.token);
  // console.log(form);
  // javascript
  const handleChnage = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allFiles = form.images; //empty array[]

      for (let i = 0; i < files.length; i++) {
        // console.log(i)
        // console.log(files[i]);
        // validate

        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not a picture`);
          continue;
        }
        // image resize

        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPG",
          100,
          0,
          (data) => {
            // endpoint backend
            Uploadfiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success(`Upload image success!!!`);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
    // console.log(files);
  };
  const handleDelete = (public_id) => {
    // console.log(public_id)
    const images = form.images;

    Removefiles(token, public_id)
      .then((res) => {
        const filterImage = images.filter((item, index) => {
          console.log(item);
          return item.public_id !== public_id;
        });
        console.log(filterImage);
        setForm({
          ...form,
          images:filterImage
        })
        toast.error("Remove Image Sucess!!!",{
          position:"top-center"
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4 ">
        {/* image */}
        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img className="w-24 h-24 hover:scale-115" src={item.url} />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 text-red-500 font-bold"
            >
              X
            </span>
          </div>
        ))}
      </div>

      <div onChange={handleChnage}>
        <input className="bg-gray-400" type="file" multiple />
      </div>
    </div>
  );
};

export default uploadfile;
