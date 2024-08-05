import React, { useState } from 'react';
import './Checkout.css';
import { useGetUserCartQuery } from '../../redux/services/cart';
import { useNewOrderMutation } from '../../redux/services/orders';
import { useCreateHostedCheckoutMutation } from '../../redux/services/payment';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserCartQuery();
  const [newOrder] = useNewOrderMutation();
  const [createHostedCheckout] = useCreateHostedCheckoutMutation();

  const [address, setAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: 'United States (US)',
    pinCode: '',
    address2: '', // For optional apartment/suite/unit field
    orderNotes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      deliveryAddress: {
        address: address.address,
        city: address.city,
        state: address.state,
        country: address.country,
        pinCode: address.pinCode,
      },
    };

    try {
      console.log('Placing new order:', order);
      const ord = await newOrder(order).unwrap();
      console.log('Order placed:', ord);

      const response = await createHostedCheckout({ orderId: ord.order.id }).unwrap();
      console.log('Hosted checkout response:', response);

      if (response && response.paymentLink) {
        window.location.href = response.paymentLink;
      } else {
        console.error('Payment link not found in response');
      }
    } catch (error) {
      console.error('Error during order placement or hosted checkout creation:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart</div>;

  const { item: cartItems, total: cartTotal } = data.cart;

  return (
    <div className="checkout-container">
      <div className="billing-details col-md-8 mr-2">
        <form>
          <h2>Billing Details</h2>
          <div className="form-group">
            <label>Select Existing Address</label>
            <select>
              <option value="">Select an address...</option>
              <option value="1">123 Main Street, Apt 4B, New York, NY 10001</option>
              <option value="2">456 Elm Street, Suite 200, San Francisco, CA 94102</option>
            </select>
          </div>
          <div className="form-group">
            <label>Country / Region *</label>
            <select name="country" value={address.country} onChange={handleInputChange}>
              <option value="United States (US)">United States (US)</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Street address *</label>
            <input
              type="text"
              name="address"
              placeholder="House number and street name"
              value={address.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={address.address2}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Town / City *</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>State *</label>
            <select name="state" value={address.state} onChange={handleInputChange}>
              <option value="Alabama">Alabama</option>
              {/* Add more states as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>ZIP Code *</label>
            <input
              type="text"
              name="pinCode"
              value={address.pinCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input type="checkbox" />
            <label>SHIP TO A DIFFERENT ADDRESS?</label>
          </div>
          <div className="form-group">
            <label>Order notes (optional)</label>
            <textarea
              name="orderNotes"
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={address.orderNotes}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </form>
      </div>

      <div className="order-summary col-md-4">
        <h2>Your Order</h2>
        <div className="order-items">
          {cartItems.map(({ product, quantity, totalPrice }) => (
            <div className="order-item" key={product.id}>
              <span>{product.name} x {quantity}</span>
              <span>{totalPrice}/-</span>
            </div>
          ))}
          <div className="order-summary-details">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>{cartTotal}/-</span>
            </div>
            <div className="summary-item">
              <span>Flat rate</span>
              <span>$5.00</span>
            </div>
            <div className="summary-item">
              <span>Total</span>
              <span>{cartTotal + 5}/-</span>
            </div>
          </div>
        </div>
        <div className="payment-method">
          <h3>Payment Method</h3>
          <div className="form-group">
            <input type="radio" id="bank-transfer" name="payment" />
            <label htmlFor="bank-transfer">Direct bank transfer</label>
          </div>
          <div className="form-group">
            <input type="radio" id="check-payments" name="payment" />
            <label htmlFor="check-payments">Check payments</label>
          </div>
          <div className="form-group">
            <input type="radio" id="cash-delivery" name="payment" />
            <label htmlFor="cash-delivery">Cash on delivery</label>
          </div>
          <div className="form-group">
            <input type="checkbox" />
            <label>I have read and agree to the website terms and conditions *</label>
          </div>
          <Button
            sx={{
              mt: 3,
              mb: 2,
              background: "#673eb4",
              fontSize: '0.875rem',
              padding: '8px 16px',
            }}
            onClick={handleSubmit}
          >
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
