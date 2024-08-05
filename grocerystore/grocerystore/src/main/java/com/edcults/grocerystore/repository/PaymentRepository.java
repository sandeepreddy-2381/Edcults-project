package com.edcults.grocerystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.PaymentInfo;

public interface PaymentRepository extends JpaRepository<PaymentInfo, Long> {
    
}
