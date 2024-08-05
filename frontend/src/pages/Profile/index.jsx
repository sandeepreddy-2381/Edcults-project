import React, { useState, useEffect } from 'react';
import './profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    id: 0,
    email: '',
    fullname: '',
    orders: [],
    addresses: []
  });

  useEffect(() => {
    // Fetch profile data here
    const fetchProfile = async () => {
      // Replace with actual fetch call
      const response = await fetchProfileData();
      setProfile(response);
    };

    fetchProfile();
  }, []);

  const fetchProfileData = async () => {
    // Replace with actual API call
    return {
      id: 1,
      email: 'user@example.com',
      fullname: 'John Doe',
      orders: [
        {
          id: 1,
          products: [
            { id: 1, name: 'Product 1', amount: '$10' },
            { id: 2, name: 'Product 2', amount: '$20' }
          ]
        },
        {
          id: 2,
          products: [
            { id: 3, name: 'Product 3', amount: '$30' },
            { id: 4, name: 'Product 4', amount: '$40' }
          ]
        }
      ],
      addresses: [
        { id: 1, address: '123 Main St, City, Country' },
        { id: 2, address: '456 Another St, City, Country' }
      ]
    };
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <h2>ID: {profile.id}</h2>
      <h2>Email: {profile.email}</h2>
      <h2>Full Name: {profile.fullname}</h2>
      <hr className="divider" />

      <h2>Orders</h2>
      <ul className='list'>
        {profile.orders.map((order) => (
          <li key={order.id}>
            <strong>Order ID:</strong> {order.id}
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  <strong>Product:</strong> {product.name} <br />
                  <strong>Amount:</strong> {product.amount}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <hr className="divider" />

      <h2>Addresses</h2>
      <ul>
        {profile.addresses.map((address) => (
          <li key={address.id}>
            <strong>Address ID:</strong> {address.id} <br />
            <strong>Address:</strong> {address.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
