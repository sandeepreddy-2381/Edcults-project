package com.edcults.grocerystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
}
