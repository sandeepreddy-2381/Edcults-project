import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import Button from "@mui/material/Button";
import {
  useGetUserCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemQuantityMutation,
} from "../../redux/services/cart";
import QuantityBox from "../../components/quantityBox";

function Cart() {
  const { data, error, isLoading, refetch } = useGetUserCartQuery();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart</div>;

  const { item: cartItems, total: cartTotal } = data.cart;
  const itemCount = cartItems.length;

  const handleRemove = async (itemId) => {
    await removeCartItem(itemId);
    refetch(); // Refetch cart data after removing an item
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    await updateCartItemQuantity({ id: itemId, quantity: newQuantity });
    refetch(); // Refetch cart data after updating the quantity
  };

  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <h2>Cart</h2>
          <p>
            There are <b>{itemCount}</b> products in your cart
          </p>
          <div className="row">
            <div className="col-md-9">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th width="35%">Product</th>
                      <th width="15%">Price</th>
                      <th width="25%">Quantity</th>
                      <th width="15%">Total</th>
                      <th width="10%">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(({ id, product, quantity, totalPrice }) => (
                      <tr key={id}>
                        <td width="35%">
                          <Link to={`/product/${product.id}`}>
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img
                                  src={
                                    "http://localhost:8000/products/images/" +
                                    product.images[0].id
                                  }
                                  alt={product.name}
                                  className="wt-100"
                                />
                              </div>
                              <div className="info px-3">
                                <h6>{product.name}</h6>
                                <Rating
                                  name="read-only"
                                  value={product.ratings || 0}
                                  readOnly
                                  precision={0.5}
                                  size="small"
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td width="15%">{product.price}/-</td>
                        <td width="25%">
                          <QuantityBox
                            quantity={quantity}
                            onUpdate={(newQuantity) =>
                              handleUpdateQuantity(id, newQuantity)
                            }
                          />
                        </td>
                        <td width="15%">{totalPrice}/-</td>
                        <td width="10%">
                          <span
                            className="remove"
                            onClick={() => handleRemove(id)}
                          >
                            <IoIosClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow p-3 cartDetails">
                <h4>Cart total</h4>

                <div className="d-flex align-items-center mb-3">
                  <span>Sub Total</span>
                  <span className="ml-auto text-red">{cartTotal}/-</span>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <span>Shipping</span>
                  <span className="ml-auto font-weight-bold">Free</span>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <span>Estimate for</span>
                  <span className="ml-auto font-weight-bold">India</span>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <span>Total</span>
                  <span className="ml-auto text-red">{cartTotal}/-</span>
                </div>
                <br />
                <Link to="/checkout">
                  <Button className="btn-blue btn-lg btn-big ml-3">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
