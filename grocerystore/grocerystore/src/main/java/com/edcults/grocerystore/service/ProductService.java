package com.edcults.grocerystore.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.edcults.grocerystore.dto.ProductReqRes;
import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.models.Category;
import com.edcults.grocerystore.models.Product;
import com.edcults.grocerystore.models.ProductImage;
import com.edcults.grocerystore.models.Supplier;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.CategoryRepository;
import com.edcults.grocerystore.repository.ProductImageRepository;
import com.edcults.grocerystore.repository.ProductRepository;
import com.edcults.grocerystore.repository.SupplierRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired 
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductImageRepository productImageRepository;


    // @Transactional
    // public Product createProduct(ProductReqRes productReqRes) throws Exception{        
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String email = authentication.getName();
    //     ReqRes response = userService.getMyInfo(email);

    //     Users user = response.getUsers();
    //     System.out.println(productReqRes);
    //     Product product = new Product();
    //     product.setName(productReqRes.getName());
    //     product.setCreatedAt(LocalDateTime.now());
    //     product.setCreatedBy(user);
    //     product.setDescription(productReqRes.getDescription());
    //     product.setAvailable(productReqRes.getAvailable());
    //     product.setPrice(productReqRes.getPrice());
    //     product.setBrand(productReqRes.getBrand());
    //     product.setStock(productReqRes.getStock());
    //     product.setStatus("active");
    //     product.setImage(productReqRes.getImage());
    //     product.setTags(productReqRes.getTags());
        
    //     // Fetch and set the Supplier
    //     Supplier supplier = supplierRepository.findById(productReqRes.getSupplierId())
    //             .orElseThrow(() -> new RuntimeException("Supplier not found"));
    //     product.setSupplier(supplier);

    //     // Fetch and set the Category
    //     Category category = categoryRepository.findById(productReqRes.getCategoryId())
    //             .orElseThrow(() -> new RuntimeException("Category not found"));
    //     product.setCategory(category);

    //     product.setCreatedAt(LocalDateTime.now());
    //     product.setCreatedBy(user);
    //     return productRepository.save(product);
    // }
    // @Transactional
    // public Product createProduct(ProductReqRes productReqRes, List<MultipartFile> imageFiles) throws Exception {
    //     // Save product
    //     Product product = new Product();
    //     product.setName(productReqRes.getName());
    //     product.setDescription(productReqRes.getDescription());
    //     product.setAvailable(productReqRes.getAvailable());
    //     product.setPrice(productReqRes.getPrice());
    //     product.setBrand(productReqRes.getBrand());
    //     product.setStock(productReqRes.getStock());
    //     product.setStatus("active");
    //     product.setCreatedAt(LocalDateTime.now());
    
    //     // Fetch and set the Supplier
    //     Supplier supplier = supplierRepository.findById(productReqRes.getSupplierId())
    //             .orElseThrow(() -> new RuntimeException("Supplier not found"));
    //     product.setSupplier(supplier);
    
    //     // Fetch and set the Category
    //     Category category = categoryRepository.findById(productReqRes.getCategoryId())
    //             .orElseThrow(() -> new RuntimeException("Category not found"));
    //     product.setCategory(category);
    
    //     // Save product
    //     product = productRepository.save(product);
    
    //     // Save image files
    //     for (MultipartFile imageFile : imageFiles) {
    //         String imageName = UUID.randomUUID().toString() + "-" + imageFile.getOriginalFilename();
    //         String imageType = imageFile.getContentType();
    //         String imageUrl = uploadDir + imageName;
    
    //         // Save file to local server
    //         File file = new File(imageUrl);
    //         imageFile.transferTo(file);
    
    //         // Create and associate ProductImage
    //         ProductImage productImage = new ProductImage();
    //         productImage.setImageType(imageType);
    //         productImage.setImageName(imageName);
    //         productImage.setImageUrl(imageUrl);
    //         productImage.setProduct(product); // Associate the product
    
    //         // Add image to product
    //         product.addImage(productImage);
    //     }
    
    //     // Save product with images
    //     System.out.println(product);
    //     product = productRepository.save(product);
    
    //     return product;
    // }
    @Transactional
    public Product createProduct(ProductReqRes productReqRes, List<MultipartFile> imageFiles) throws Exception {
        // Save product
        Product product = new Product();
        product.setName(productReqRes.getName());
        product.setDescription(productReqRes.getDescription());
        product.setAvailable(productReqRes.getAvailable());
        product.setPrice(productReqRes.getPrice());
        product.setBrand(productReqRes.getBrand());
        product.setStock(productReqRes.getStock());
        product.setStatus("active");
        product.setCreatedAt(LocalDateTime.now());

        // Fetch and set the Supplier
        Supplier supplier = supplierRepository.findById(productReqRes.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        product.setSupplier(supplier);

        // Fetch and set the Category
        Category category = categoryRepository.findById(productReqRes.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        product = productRepository.save(product);
        System.out.println(product);
        // Save image files
        List<ProductImage> productImages = new ArrayList<>();
        for (MultipartFile imageFile : imageFiles) {
            String imageName = UUID.randomUUID().toString() + "-" + imageFile.getOriginalFilename();
            String imageType = imageFile.getContentType();
            String imageUrl = uploadDir + imageName;

            // Save file to local server
            File file = new File(imageUrl);
            imageFile.transferTo(file);
           
            // Create and save ProductImage
            ProductImage productImage = new ProductImage();
            productImage.setImageType(imageType);
            productImage.setImageName(imageName);
            productImage.setImageUrl(imageUrl);
            productImage.setProduct(product);
            productImages.add(productImage);
        }
        List<ProductImage> images=productImageRepository.saveAll(productImages);
        product.getImages().addAll(images); // Add new images to existing ones

        return product;
    }

    @Transactional
    public Product updateProduct(Long id,ProductReqRes productReqRes) throws Exception{        
        // Fetch the existing product by ID
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new Exception("PRODUCT-NOT-FOUND"));

        // Update the product attributes if provided
        if (productReqRes.getName() != null) {
            product.setName(productReqRes.getName());
        }
        if (productReqRes.getDescription() != null) {
            product.setDescription(productReqRes.getDescription());
        }
        if (productReqRes.getPrice() != null) {
            product.setPrice(productReqRes.getPrice());
        }
        if (productReqRes.getStock() != null) {
            product.setStock(productReqRes.getStock());
        }
        if (productReqRes.getBrand() != null) {
            product.setBrand(productReqRes.getBrand());
        }
        if (productReqRes.getAvailable() != null) {
            product.setAvailable(productReqRes.getAvailable());
        }
        if (productReqRes.getStatus() != null) {
            product.setStatus(productReqRes.getStatus());
        }
        if (productReqRes.getTags() != null) {
            product.setTags(productReqRes.getTags());
        }

        // Fetch and set the Supplier if provided
        if (productReqRes.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(productReqRes.getSupplierId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            product.setSupplier(supplier);
        } 

        // Fetch and set the Category if provided
        if (productReqRes.getCategoryId() != null) {
            Category category = categoryRepository.findById(productReqRes.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        } 

        // Set audit fields
        product.setUpdatedAt(LocalDateTime.now());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();
        product.setUpdatedBy(user);

        // Save and return the updated product
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProductImages(Long id, List<MultipartFile> imageFiles) throws Exception {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<ProductImage> images = saveImages(product,imageFiles);
        product.getImages().addAll(images); // Add new images to existing ones

        return productRepository.save(product);
    }

    private List<ProductImage> saveImages(Product product, List<MultipartFile> imageFiles) throws Exception {
        List<ProductImage> productImages = new ArrayList<>();
        for (MultipartFile imageFile : imageFiles) {
            String imageName = UUID.randomUUID().toString() + "-" + imageFile.getOriginalFilename();
            String imageType = imageFile.getContentType();
            String imageUrl = uploadDir + imageName;

            // Save file to local server
            File file = new File(imageUrl);
            imageFile.transferTo(file);
           
            // Create and save ProductImage
            ProductImage productImage = new ProductImage();
            productImage.setImageType(imageType);
            productImage.setImageName(imageName);
            productImage.setImageUrl(imageUrl);
            productImage.setProduct(product);
            productImages.add(productImage);
        }
        return productImageRepository.saveAll(productImages); // Save all product images to the database
    }

    @Transactional
    public void deleteImage(Long imageId) throws Exception {
        ProductImage productImage = productImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));

        // Remove image from file system
        Path path = Paths.get( productImage.getImageUrl());
        Files.deleteIfExists(path);

        // Remove image from database
        productImageRepository.delete(productImage);
    }
     

    public Product getProduct(Long id) throws Exception{
        return productRepository.findById(id)
        .orElseThrow(()->new Exception("PRODUCT-NOT-FOUND"));
    }

    public List<Product> getProducts() throws Exception{
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) throws Exception{
        Product product = getProduct(id);
        if (product !=null){
            productRepository.deleteById(id);
        }else{
            throw new Exception("PRODUCT-NOT-FOUND");
        }
    }

    public List<Product> getSupplierProducts(Long supplierId) throws Exception {
        return productRepository.findBySupplierId(supplierId);
    }

    public List<Product> getCategoryProducts(Long categoryId) throws Exception {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> searchProduct(String keyword) throws Exception {
        return productRepository.searchProduct(keyword);
    }
}
