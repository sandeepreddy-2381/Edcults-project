package com.edcults.grocerystore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
        public List<Order> findByUserId(Long userId);
}
