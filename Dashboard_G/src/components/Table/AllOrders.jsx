import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IoIosArrowDown } from "react-icons/io";
import './AllOrders.css';

const statuses = ['Pending', 'Approved', 'Completed', 'Cancelled'];

const makeStyles = (status) => {
  if (status === 'Approved') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    };
  } else if (status === 'Pending') {
    return {
      background: '#ffada8',
      color: 'red',
    };
  } else {
    return {
      background: '#59bfff',
      color: 'white',
    };
  }
};

function AllOrders() {
  const [products, setProducts] = useState([
    { name: 'Dark Chocolate', trackingId: 630, data: '27 sep 2024', status: 'Approved' },
    { name: 'Dark Chocolate', trackingId: 390, data: '27 sep 2024', status: 'Pending' },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleMenuOpen = (event, trackingId) => {
    setAnchorEl(event.currentTarget);
    setCurrentProductId(trackingId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentProductId(null);
  };

  const handleStatusChange = (newStatus) => {
    setProducts(products.map(product =>
      product.trackingId === currentProductId ? { ...product, status: newStatus } : product
    ));
    handleMenuClose();
  };

  return (
    <div className="Table">
      <h1>All Orders</h1>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: '0px 13px 20px 0px #80808029',
          borderRadius : '10px'
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '1px solid rgba(0,0,0,0.4)' }}>
              <TableCell><h2>Product</h2></TableCell>
              <TableCell align="left"><h2>Tracking ID</h2></TableCell>
              <TableCell align="left"><h2>Date</h2></TableCell>
              <TableCell align="left"><h2>Status</h2></TableCell>
              <TableCell align="left"><h2>Queries</h2></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.trackingId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.trackingId}</TableCell>
                <TableCell align="left">{row.data}</TableCell>
                <TableCell align="left">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="status" style={makeStyles(row.status)}>{row.status}</span>
                    <IconButton onClick={(event) => handleMenuOpen(event, row.trackingId)}>
                      {/* <MoreVertIcon /> */}
                      <IoIosArrowDown/>
                    </IconButton>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} onClick={() => handleStatusChange(status)}>
                        <span className="status" style={makeStyles(status)}>{status}</span>
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
                <TableCell align="left">Detail</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllOrders;
