import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "@mui/material/Button";

function QuantityBox({ quantity, onUpdate }) {
  const [inputVal, setInputVal] = useState(quantity);

  const minus = () => {
    if (inputVal > 1) {
      const newQuantity = inputVal - 1;
      setInputVal(newQuantity);
      onUpdate(newQuantity);
    }
  };

  const plus = () => {
    const newQuantity = inputVal + 1;
    setInputVal(newQuantity);
    onUpdate(newQuantity);
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <FaMinus />
      </Button>
      <input type="text" value={inputVal} readOnly />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
}

export default QuantityBox;
