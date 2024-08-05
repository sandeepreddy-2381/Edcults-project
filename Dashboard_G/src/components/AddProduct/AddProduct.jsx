import React, { useState } from "react";
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

import { useGetCategoriesQuery } from "../../redux/services/category";

const AddProductForm = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

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
    console.log(product);
  };
  console.log(data)
  return (
    <Container
      maxWidth="sm"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom margin={0}>
          Add Product
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
                  labelId="category-label"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {data.categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
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
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddProductForm;
