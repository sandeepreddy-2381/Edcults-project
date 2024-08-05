package com.edcults.grocerystore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.Category;


public interface  CategoryRepository  extends JpaRepository<Category, Long>{
    Optional<Category> findByName(String name);
}
