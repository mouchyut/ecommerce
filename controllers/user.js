const prisma = require("../config/prisma");

exports.getUser = async (req, res) => {
  try {
    // code
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        enabled: true,
        role: true,
      },
    });
    console.log(users);
    res.send("Hello get user!!!");
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
exports.changeStatus = async (req, res) => {
  try {
    // change status by id mean search by id and update status
    const { id, enabled } = req.body;
    // console.log(id,enabled)
    const users = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        enabled: enabled,
      },
    });
    res.send("Status was change!!!!");
  } catch (err) {
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.changeRole = async (req, res) => {
  try {
    // code
    const { id, role } = req.body;
    const users = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
    });
    res.send("User role changed!!!!!");
  } catch (err) {
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.createCart = async (req, res) => {
  try {
    // code
    const { cart } = req.body;
    // console.log(cart)
    // Check which user is making the request
    // console.log(req.user.id)
    const user = await prisma.user.findFirst({
      where: {
        id: Number(req.user.id),
      },
    });
    // console.log(cart)
    // delete old cart item
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderById: user.id,
        },
      },
    });
    // delete old cart
    await prisma.cart.deleteMany({
      where: {
        orderById: user.id,
      },
    });
    // เตรยีมสินค้า (มาจาก body postman)

    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));
    // console.log(products)
    // total price of producs
    let totalCart = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    // console.log(totalCart)
    // add new cart
    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: totalCart,
        orderById: user.id,
      },
    });
    // console.log(newCart);
    res.send("Add to cart sucess!!!!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.getCart = async (req, res) => {
  try {
    // code
    const cart = await prisma.cart.findFirst({
      where: {
        orderById: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    // console.log(cart)
    if (!cart.length === 0) {
      return res.json({ OK: false, message: "No product on cart" });
    }
    res.json({
      products: cart.products,
      cartTotal: cart.cartTotal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.removeCart = async (req, res) => {
  try {
    // code
    // empty cart
    // check cart first this cart have product or not
    const cart = await prisma.cart.findFirst({
      where: {
        orderById: Number(req.user.id),
      },
    });
    if (!cart) {
      res.status(500).json({ message: "No Cart!!!" });
    }
    await prisma.productOnCart.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
    const result = await prisma.cart.deleteMany({
      where: {
        orderById: Number(req.user.id),
      },
    });
    console.log(result);
    res.json({
      message: "Cart Empty!!!",
      deleteCount: result.count,
    });
  } catch (err) {
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.address = async (req, res) => {
  try {
    // code
    const { address } = req.body;
    // console.log(address)
    const userAddress = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });
    res.json({
      Ok: true,
      message: "Address Save!!!",
    });
  } catch (err) {
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.SaveOrder = async (req, res) => {
  try {
    // code
    // step 1 get user cart
    const userCart = await prisma.cart.findFirst({
      where: {
        orderedBy: {
          id: Number(req.user.id),
        },
      },
      include: {
        products: true,
      },
    });
    // check empty cart

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ Ok: false, message: "Cart is Empty!!!!" });
    }
    // check quantity of cart
    for (const item of userCart.products) {
      // console.log(item);
      const product = await prisma.product.findUnique({
        where: {
          id: Number(item.productId),
        },
        select: {
          quantity: true,
          title: true,
        },
      });
      // console.log(item)
      // console.log(product);
      if (!product || item.count > product.quantity) {
        return res.status(400).json({
          Ok: false,
          message: `Sorry Product ${product.title} out of stock!!!`,
        });
      }
    }
    // create new order
    const order = await prisma.order.create({
      data: {
        products: {
          create: userCart.products.map((item) => ({
            productId: item.productId,
            price: item.price,
            count: item.count,
          })),
        },
        orderedBy: {
          connect: { id: Number(req.user.id) },
        },
        cartTotal: userCart.cartTotal,
      },
    });
    // console.log(order);
    // update product (when save order it could be minus product in stock and clear product in cart)

    const update = userCart.products.map((item) => ({
      where: {
        id: item.productId,
      },
      data: {
        quantity: { decrement: item.count },
        sold: { increment: item.count },
      },
    }));
    await Promise.all(update.map((item) => prisma.product.update(item)));
    await prisma.cart.deleteMany({
      where: {
        orderById: Number(req.user.id),
      },
    });
    res.json({ Ok: true, order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error!!!" });
  }
};
exports.getOrder = async (req, res) => {
  try {
    // code
    const orders = await prisma.order.findMany({
      where: {
        orderById: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!orders.length === 0) {
      return res.status(400).json({ OK: false, message: "No order" });
    }
    // console.log(orders)
    res.json({ Ok: true, orders });
  } catch (err) {
    res.status(500).json({ message: "server error!!!" });
  }
};
