package com.edcults.grocerystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.ProductImage;

public interface  ProductImageRepository extends JpaRepository<ProductImage, Long> {
    
}
