import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store";
import { toast } from "react-toastify";
import { useState } from "react";

export const CartBtn = ({ product, qty = 1 }) => {
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();

  const addToCart = () => {
    setLoading(true);

    let id = product._id;

    let price =
      parseFloat(product.discounted_price > 0 ? product.discounted_price : product.price)

    let qt = qty;

    let total = price * qty;

    if (id in cart) {
      qt += cart[id]['qty']
      total = price * qt;
    }

    dispatch(
      setCart({
        ...cart,
        [id]: {
          product,
          qty: qt,
          total,
          price,
        },
      })
    );

    setLoading(false);

    toast.success("Product added in Cart");
  };
  return (
    <button className="btn btn-outline-dark" type="button" onClick={addToCart}>
      <i
        className={`fas ${
          loading ? "fa-spinner fa-spin" : "fa-cart-plus"
        } me-2`}
      ></i>
      Add to Cart
    </button>
  );
};
