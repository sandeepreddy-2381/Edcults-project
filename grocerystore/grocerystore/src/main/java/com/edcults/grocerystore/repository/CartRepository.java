package com.edcults.grocerystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
    public Cart findByUserId(Long userId);
}
