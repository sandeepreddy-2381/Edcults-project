package com.edcults.grocerystore.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "paymentinfo")
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String paymentId;

    private String status;

    private Users user;

    private LocalDateTime createdAt;
}
