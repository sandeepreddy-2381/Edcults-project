package com.edcults.grocerystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
