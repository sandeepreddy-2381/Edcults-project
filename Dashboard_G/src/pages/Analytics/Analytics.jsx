// import React from 'react';
// import {
//   Container,
//   Grid,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import './products.css';


// const ProductDetails = () => {
//   const product = {
//     name: 'Sample Product',
//     description: 'This is a sample product description.',
//     price: 99.99,
//     stock: 10,
//     brand: 'Sample Brand',
//     available: true,
//     images: [
//       { url: 'https://via.placeholder.com/150' },
//       { url: 'https://via.placeholder.com/150' },
//     ],
//     ratings: 4.5,
//     numOfReviews: 20,
//     tags: 'sample, product',
//     createdAt: '2023-07-30T12:00:00',
//     category: 'Sample Category',
//   };

//   return (
//         <div className="container mt-10">
//           Hello
//         </div>
//   );
// };

// export default ProductDetails;


import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const EditProductForm = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stockQuantity: 0,
    brand: "",
    available: false,
    image: [],
    tags: "",
    category: "",
    supplier: "",
  });


  const existingProduct = {
    id: '123',
    name: 'Example Product',
    description: 'This is an example product description.',
    price: 49.99,
    stockQuantity: 100,
    brand: 'Example Brand',
    available: true,
    image: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ],
    tags: 'electronics, gadget',
    category: 'Electronics',
    supplier: 'Supplier1'
  };
  

  useEffect(() => {
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (existingProduct) {
      console.log("Updating product:", product);
      // Add update logic here
    } else {
      console.log("Adding new product:", product);
      // Add add logic here
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom margin={0}>
          {existingProduct ? "Edit Product" : "Add Product"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="ID"
                name="id"
                value={product.id}
                onChange={handleChange}
                variant="outlined"
                disabled={!!existingProduct}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={product.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={product.price}
                onChange={handleChange}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="image-upload"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    image: Array.from(e.target.files),
                  })
                }
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{
                    background: "#ffc6f1",
                    "&:hover": {
                      background: "#FF919D",
                    },
                  }}
                >
                  Upload Images
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags"
                name="tags"
                value={product.tags}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* Replace with dynamic category options */}
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: "#ffc6f1",
                  "&:hover": {
                    background: "#FF919D",
                  },
                }}
              >
                {existingProduct ? "Update Product" : "Add Product"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EditProductForm;
