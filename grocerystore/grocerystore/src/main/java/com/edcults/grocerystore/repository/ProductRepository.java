package com.edcults.grocerystore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edcults.grocerystore.models.Category;
import com.edcults.grocerystore.models.Product;


public interface  ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findBySupplierId(Long supplierId);
    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT p FROM Product p WHERE p.supplier.id = :supplierId AND p.category = :category")
    List<Product> findBySupplierIdAndCategory(@Param("supplierId") Long supplierId, @Param("category") Category category);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
    "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
    "OR LOWER(p.category.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProduct(@Param("keyword") String keyword);
}
