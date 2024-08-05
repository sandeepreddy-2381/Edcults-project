package com.edcults.grocerystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.Review;


public interface ReviewRepository extends JpaRepository<Review, Long>{
}
