// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Container,
//   Grid,
//   Typography,
//   Box,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";

// import { useGetCategoriesQuery } from "../../redux/services/category";
// import { useCreateProductMutation } from "../../redux/services/products";

// function Products() {
//   const { data, error, isLoading } = useGetCategoriesQuery();
//   const [createProduct, { isLoading: isCreating, isSuccess, isError, error: creationError }] = useCreateProductMutation();
//   const [imageFiles, setImageFiles] = useState([]);

//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: 0,
//     brand: "",
//     available: true,
//     tags: "",
//     categoryId: "",
//     supplier: 1,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProduct({
//       ...product,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleImageChange = (e) => {
//     setImageFiles(Array.from(e.target.files));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("product", JSON.stringify(product));

//     imageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     console.log(product, imageFiles);
//     await createProduct(formData);
//   };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

//   return (
//     <Container
//       maxWidth="sm"
//       style={{ display: "flex", justifyContent: "center" }}
//     >
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom margin={0}>
//           Add Product
//         </Typography>
//         {isSuccess && <p>Product created successfully!</p>}
//         {isError && <p>Error: {creationError.message}</p>}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={product.name}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={product.description}
//                 onChange={handleChange}
//                 variant="outlined"
//                 multiline
//                 rows={4}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   labelId="category-label"
//                   name="categoryId"
//                   value={product.categoryId}
//                   onChange={handleChange}
//                   label="Category"
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
                  // {data.categories.map((category, index) => (
                  //   <MenuItem key={index} value={category.id}>
                  //     {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Price"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type="number"
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Stock Quantity"
//                 name="stock"
//                 value={product.stock}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type="number"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Brand"
//                 name="brand"
//                 value={product.brand}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <input
//                 id="image-upload"
//                 multiple
//                 type="file"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//               <label htmlFor="image-upload">
//                 <Button
//                   variant="contained"
//                   component="span"
//                   fullWidth
//                   sx={{
//                     background: "#ffc6f1",
//                     "&:hover": {
//                       background: "#FF919D",
//                     },
//                   }}
//                 >
//                   Upload Images
//                 </Button>
//               </label>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Tags"
//                 name="tags"
//                 value={product.tags}
//                 onChange={handleChange}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   background: "#ffc6f1",
//                   "&:hover": {
//                     background: "#FF919D",
//                   },
//                 }}
//                 disabled={isCreating}
//               >
//                 {isCreating ? "Creating..." : "Add Product"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// export default Products;


import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useCreateProductMutation } from '../../redux/services/products';
import { useGetCategoriesQuery } from '../../redux/services/category';

const CreateProduct = () => {
  const { data, error , isLoading } = useGetCategoriesQuery();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [createProduct, { isLoading: isCreating, isSuccess, isError, error: creationError }] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierId = 4;

    const product = {
      name,
      description,
      price,
      stock,
      brand,
      categoryId,
      tags,
      supplierId
    };

    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    console.log(imageFiles);
    await createProduct(formData);

    setName('');
    setBrand('');
    setCategoryId('');
    setPrice('');
    setDescription('');
    setTags('');
    setImageFiles([]);
    setStock('')
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom margin={0}>
          Create Product
        </Typography>
        {isSuccess && <Typography color="success.main">Product created successfully!</Typography>}
        {isError && <Typography color="error.main">Error: {creationError.message}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                variant="outlined"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  label="Category"
                >
                  {data.categories.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="image-upload"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => setImageFiles(Array.from(e.target.files))}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  sx={{
                    background: '#ffc6f1',
                    '&:hover': {
                      background: '#FF919D',
                    },
                  }}
                >
                  Upload Images
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: '#ffc6f1',
                  '&:hover': {
                    background: '#FF919D',
                  },
                }}
                disabled={isCreating}
              >
                {isCreating ? 'Creating...' : 'Create Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProduct;
