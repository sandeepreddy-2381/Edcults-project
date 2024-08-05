// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
//   Rating,
//   Pagination,
//   Box,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useGetProductsQuery } from '../../redux/services/products';


// const ProductList = () => {


//   const { data, error, isLoading } = useGetProductsQuery();

 

//   const products = [
//     {
//       id: 1,
//       image: "",
//       name: "Werther'original caramel hard candies",
//       status: "In Stock",
//       rating: 5,
//       oldPrice: 20.0,
//       netPrice: 10.0,
//       discount: 28,
//     },
//     {
//       id: 2,
//       image: "",
//       name: "Product 2",
//       status: "In Stock",
//       rating: 4.5,
//       oldPrice: 25.0,
//       netPrice: 15.0,
//       discount: 30,
//     },
//     {
//       id: 3,
//       image: "",
//       name: "Werther'original caramel hard candies",
//       status: "In Stock",
//       rating: 5,
//       oldPrice: 20.0,
//       netPrice: 10.0,
//       discount: 28,
//     },
//     {
//       id: 4,
//       image: "",
//       name: "Werther original caramel hard candies",
//       status: "In Stock",
//       rating: 5,
//       oldPrice: 20.0,
//       netPrice: 10.0,
//       discount: 28,
//     },
//     {
//       id: 5,
//       image: "",
//       name: "Werther'original caramel hard candies",
//       status: "In Stock",
//       rating: 5,
//       oldPrice: 20.0,
//       netPrice: 10.0,
//       discount: 28,
//     },
//     {
//       id: 6,
//       image: "",
//       name: "Werther'original caramel hard candies",
//       status: "In Stock",
//       rating: 5,
//       oldPrice: 20.0,
//       netPrice: 10.0,
//       discount: 28,
//     },
//   ];

//   const [page, setPage] = useState(1);
//   const productsPerPage = 3;
//   const handleChange = (event, value) => {
//     setPage(value);
//   };

//   const displayedProducts = products.slice(
//     (page - 1) * productsPerPage,
//     page * productsPerPage
//   );


//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1 style={{ textAlign: "center" }}>Products</h1>
//       <Grid container spacing={4}>
//         {data.products.map((product) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 maxWidth: 250,
//                 margin: "auto",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 alt={product.name}
//                 image={product.image}
//                 sx={{ height: 140 }}
//               />
//               <CardContent sx={{ marginTop: "10px" }}>
//                 <Typography
//                   gutterBottom
//                   variant="h6"
//                   component="div"
//                   sx={{
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     mb: 1,
//                   }}
//                 >
//                   {product.name}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Status: {product.status}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Rating: <Rating value={product.rating} readOnly />
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Old Price: ${product.oldPrice.toFixed(2)}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Net Price: ${product.netPrice.toFixed(2)}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Discount: {product.discount}%
//                 </Typography>
//               </CardContent>

//               <CardActions>
//                 <Link to = "/editproduct">
//                 <Button
//                   size="small"
//                   sx={{
//                     color: "#fff",
//                     backgroundColor: "#e91e63",
//                     "&:hover": {
//                       backgroundColor: "#d81b60",
//                     },
//                   }}
//                 >
//                   Edit Product
//                 </Button>
//                 </Link>
//                 {/* <Button
//                   size="small"
//                   sx={{
//                     color: "#fff",
//                     backgroundColor: "#e91e63",
//                     "&:hover": {
//                       backgroundColor: "#d81b60",
//                     },
//                   }}
//                 >
//                   View Details
//                 </Button> */}
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
//         <Pagination
//           count={Math.ceil(products.length / productsPerPage)}
//           page={page}
//           onChange={handleChange}
//           color="primary"
//         />
//       </Box>
//     </div>
//   );
// };

// export default ProductList;


// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
//   Rating,
//   Pagination,
//   Box,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useGetProductsQuery,useGetProductImageQuery} from '../../redux/services/products';

// const ProductList = () => {
//   const { data, error, isLoading } = useGetProductsQuery();


//   const [page, setPage] = useState(1);
//   const productsPerPage = 3;

//   const handleChange = (event, value) => {
//     setPage(value);
//   };

//   const displayedProducts = data?.products.slice(
//     (page - 1) * productsPerPage,
//     page * productsPerPage
//   );

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1 style={{ textAlign: "center" }}>Products</h1>
//       <Grid container spacing={4}>
//         {displayedProducts.map((product) => (
//           <Grid item key={product.id} xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 maxWidth: 250,
//                 margin: "auto",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 alt={product.name}
//                 image={product.images[0]?.imageUrl || ""}
//                 sx={{ height: 140 }}
//               />
//               <CardContent sx={{ marginTop: "10px" }}>
//                 <Typography
//                   gutterBottom
//                   variant="h6"
//                   component="div"
//                   sx={{
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     mb: 1,
//                   }}
//                 >
//                   {product.name}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Price: ${product.price.toFixed(2)}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Net Price: ${(product.price * 0.8).toFixed(2)}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 1 }}
//                 >
//                   Rating: <Rating value={product.ratings || 0} readOnly />
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Link to="/editproduct">
//                   <Button
//                     size="small"
//                     sx={{
//                       color: "#fff",
//                       backgroundColor: "#e91e63",
//                       "&:hover": {
//                         backgroundColor: "#d81b60",
//                       },
//                     }}
//                   >
//                     Edit Product
//                   </Button>
//                 </Link>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
//         <Pagination
//           count={Math.ceil(data?.products.length / productsPerPage)}
//           page={page}
//           onChange={handleChange}
//           color="primary"
//         />
//       </Box>
//     </div>
//   );
// };

// export default ProductList;


import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Pagination,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/services/products";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper function to fetch product images
const fetchProductImage = async (imageId) => {
  const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8000/"}); 
  const response = await baseQuery(`/products/images/${imageId}`);
  if (response.error) throw new Error(response.error);
  return response.data;
};

const ProductList = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [productImages, setProductImages] = useState({});
  const [page, setPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    if (data) {
      const fetchImages = async () => {
        const images = {};
        for (const product of data.products) {
          if (product.images && product.images[0]) {
            const imageId = product.images[0].id;
            console.log(imageId);
            try {
              const imageData = await fetchProductImage(imageId);
              images[product.id] = imageData.imageUrl;
            } catch (error) {
              images[product.id] = null;
            }
          }
        }
        setProductImages(images);
      };
      fetchImages();
    }
  }, [data]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const displayedProducts = data?.products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Products</h1>
      <Grid container spacing={4}>
        {displayedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 250,
                margin: "auto",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardMedia
                component="img"
                alt={product.name}
                image={productImages[product.id] || ""}
                sx={{ height: 140 }}
              />
              <CardContent sx={{ marginTop: "10px" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Price: ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Net Price: ${(product.price * 0.8).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Rating: <Rating value={product.ratings || 0} readOnly />
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/editproduct">
                  <Button
                    size="small"
                    sx={{
                      color: "#fff",
                      backgroundColor: "#e91e63",
                      "&:hover": {
                        backgroundColor: "#d81b60",
                      },
                    }}
                  >
                    Edit Product
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <Pagination
          count={Math.ceil(data?.products.length / productsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default ProductList;
