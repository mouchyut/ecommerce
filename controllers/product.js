const { data } = require("react-router-dom");
const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;
exports.create = async (req, res) => {
  try {
    const { title, description, price, quantity, images, categoryId } =
      req.body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Create error", error: err.message });
  }
};
exports.list = async (req, res) => {
  try {
    // code
    const { count } = req.params;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { id: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    res.status(400).json({ message: "create error" });
  }
};
exports.read = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(product);
  } catch (err) {
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.update = async (req, res) => {
  try {
    const { title, description, price, quantity, images, categoryId } =
      req.body;
    // delete before table before update
    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id),
      },
    });
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });

    res.status(201).json({
      message: "Update successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Update", error: err.message });
  }
};
exports.remove = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Delete Sucessfully");
  } catch (err) {
    res.status(400).json({ message: "create error" });
  }
};
exports.listby = async (req, res) => {
  try {
    // code
    const { sort, order, limit } = req.body;
    const product = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: {
        category: true,
      },
    });
    res.send(product);
  } catch (err) {
    res.status(400).json({ message: "create error" });
  }
};
const handleQuery = async (req, res, query) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(product);
  } catch (err) {
    res.status(500).json({ message: "server error!!!" });
  }
};
const handlePrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by price:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by price:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.searchfilter = async (req, res) => {
  try {
    // code
    const { price, category, query } = req.body;
    if (query) {
      console.log("query", query);
      await handleQuery(req, res, query);
    }
    if (price) {
      console.log("price", price);
      await handlePrice(req, res, price);
    }
    if (category) {
      console.log("category", category);
      await handleCategory(req, res, category);
    }
    // res.send("Hello SearchFilter product controller");
  } catch (err) {
    res.status(400).json({ message: "create error" });
  }
};
cloudinary.config({
  cloud_name: "dvoz9gqen",
  api_key: "473979145773371",
  api_secret: "h2LC7w0A7qsZ9oaPv2Bzg_X5-v4",
});
exports.createImages = async (req, res) => {
  try {
    // code
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: "Ecom2025",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.removeImage = async (req, res) => {
  try {
    // code

    const { public_id } = req.body;
    // console.log(public_id);
    cloudinary.uploader.destroy(public_id,(result)=>{
          res.send(result);
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error!!!" });
  }
};
