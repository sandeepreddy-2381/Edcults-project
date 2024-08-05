package com.edcults.grocerystore.controller;

import java.io.File;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.edcults.grocerystore.dto.ProductReqRes;
import com.edcults.grocerystore.models.Product;
import com.edcults.grocerystore.models.ProductImage;
import com.edcults.grocerystore.repository.ProductImageRepository;
import com.edcults.grocerystore.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private ProductImageRepository productImageRepository;
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    public ResponseEntity<ProductReqRes> createProduct(@RequestPart("product") String productJson,
    @RequestPart(name ="images") List<MultipartFile> images) {
        ProductReqRes resp = new ProductReqRes();
        try {
             // Deserialize the JSON string into a ProductReqRes object
            ProductReqRes req = new ObjectMapper().readValue(productJson, ProductReqRes.class);
            System.out.println(req);
            Product product = productService.createProduct(req,images);
            resp.setProduct(product);
            resp.setMessage("Created Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    public ResponseEntity<ProductReqRes> updateProduct(@PathVariable Long id,@RequestBody ProductReqRes req) {
        ProductReqRes resp = new ProductReqRes();
        try {
            Product product = productService.updateProduct(id,req);
            resp.setProduct(product);
            resp.setMessage("Updated Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{id}/images")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    public ResponseEntity<ProductReqRes> updateProductImages(
            @PathVariable Long id,
            @RequestParam("images") List<MultipartFile> images) {
        ProductReqRes resp = new ProductReqRes();
        try {
            Product product = productService.updateProductImages(id, images);
            resp.setProduct(product);
            resp.setMessage("Uploaded Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/images/{imageId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    public ResponseEntity<ProductReqRes> deleteProductImage(@PathVariable Long imageId) {
        ProductReqRes resp = new ProductReqRes();
        try {
            productService.deleteImage(imageId);
            resp.setMessage("Deleted Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<Resource> getImageById(@PathVariable Long id) {
        try {
            // Fetch the image metadata from your database
            ProductImage productImage = productImageRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Image not found"));
            System.out.println(productImage.getImageUrl()+"   "+uploadDir);
            // Construct the file path and resource
            File file = new File(Paths.get(productImage.getImageUrl()).toUri());
            Resource resource = new FileSystemResource(file);

            // Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "image/jpeg"); // Adjust content type if needed

            return new ResponseEntity<>(resource, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER','USER')")
    public ResponseEntity<ProductReqRes> product(@PathVariable Long id) {
        ProductReqRes resp = new ProductReqRes();
        try {
            Product product = productService.getProduct(id);
            resp.setProduct(product);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    public ResponseEntity<ProductReqRes> deleteProduct(@PathVariable Long id) {
        ProductReqRes resp = new ProductReqRes();
        try {
            productService.deleteProduct(id);
            resp.setMessage("Deleted Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            // e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<ProductReqRes> products() {
        ProductReqRes resp = new ProductReqRes();
        try {
            List<Product> products = productService.getProducts();
            resp.setProducts(products);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/supplier/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER')")
    public ResponseEntity<ProductReqRes> getSupplierproducts(@PathVariable Long id) {
        ProductReqRes resp = new ProductReqRes();
        try {
            List<Product> products = productService.getSupplierProducts(id);
            resp.setProducts(products);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/category/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPPLIER','USER')")
    public ResponseEntity<ProductReqRes> getCategoryProducts(@PathVariable Long id) {
        ProductReqRes resp = new ProductReqRes();
        try {
            List<Product> products = productService.getCategoryProducts(id);
            resp.setProducts(products);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ProductReqRes> searchProducts(@RequestParam("keyword") String keyword) {
        ProductReqRes resp = new ProductReqRes();
        try {
            List<Product> products = productService.searchProduct(keyword);
            resp.setProducts(products);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
