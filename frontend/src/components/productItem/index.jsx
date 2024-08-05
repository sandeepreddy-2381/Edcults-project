import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Rating } from "@mui/material";
import { TfiFullscreen } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import QuantityBox from "../quantityBox/index";
import { useAddItemToCartMutation } from '../../redux/services/cart';

function ProductItem({ product, viewProductDetails, itemView }) {
  const {
    name,
    description,
    ratings,
    price,
    stock,
    images,
    status,
  } = product;

  const [addItemToCart, { isLoading: isLoginLoading }] = useAddItemToCartMutation();
  const [quantity, setQuantity] = useState(1);

  const truncateName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };

  const ratingValue = ratings || 0;
  const ratingText = ratingValue ? ratingValue : "No ratings";

  const discount = 20;
  const netPrice = price - (price * discount / 100);

  const handleAddToCart = async () => {
    try {

      console.log(product.id);

  
       await addItemToCart({ productId: product.id, quantity });

       console.log(quantity);


      // You can add more code here to handle the response or show a success message
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // Handle the error appropriately in your UI
    }
  };

  return (
    <div className={`item productItem ${itemView}`}>
      <div className="imgWrapper">
        <img
          src={"http://localhost:8000/products/images/" + images[0].id}
          alt={name}
          className="wt100"
        />
        {discount > 0 && <span className="badge badge-primary">{discount}%</span>}
        <div className="actions">
          <Button onClick={() => viewProductDetails(product.id)}>
            <TfiFullscreen />
          </Button>
          <Button>
            <IoMdHeartEmpty style={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>
      <div className="info">
        <h4>{truncateName(name, 17)}</h4>
        <span className="text-success d-block">{status === "active" ? "In stock" : "Out of stock"}</span>
        <Rating
          className="mt-2 mb-2"
          name="read-only"
          value={ratingValue}
          readOnly
          size="small"
          precision={0.5}
        />
        <div className="d-flex">
          <span className="oldPrice">{price}/-</span>
          {discount > 0 && (
            <span className="netPrice text-danger">{netPrice.toFixed(2)}/-</span>
          )}
        </div>
        {/* <QuantityBox quantity={quantity} setQuantity={setQuantity} /> */}
        <Button
          className="btn-blue btn-lg btn-big btn-round ml-3 mt-2"
          onClick={handleAddToCart}
          disabled={isLoginLoading}
        >
          {isLoginLoading ? "Adding..." : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
