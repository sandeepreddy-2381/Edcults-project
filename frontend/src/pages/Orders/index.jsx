import React from 'react';
import './orders.css';
import { useMyOrdersQuery } from '../../redux/services/orders';

function Orders() {
  const { data, error, isLoading } = useMyOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  const orders = data.orderList;

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h2>Order ID: {order.id}</h2>
          <p><strong>Customer:</strong> {order.user.fullname}</p>
          <p><strong>Email:</strong> {order.user.email}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toDateString()}</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress.address}, {order.deliveryAddress.city}, {order.deliveryAddress.state}, {order.deliveryAddress.country}, {order.deliveryAddress.pinCode}</p>
          <h3>Items:</h3>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                <strong>Product:</strong> {item.product.name} <br />
                <strong>Quantity:</strong> {item.quantity} <br />
                <strong>Price:</strong> ${item.product.price}
              </li>
            ))}
          </ul>
          <p><strong>Total Items:</strong> {order.totalItems}</p>
          <p><strong>Items Price:</strong> ${order.itemsPrice}</p>
          <p><strong>Tax Price:</strong> ${order.taxPrice}</p>
          <p><strong>Shipping Price:</strong> ${order.shippingPrice}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
