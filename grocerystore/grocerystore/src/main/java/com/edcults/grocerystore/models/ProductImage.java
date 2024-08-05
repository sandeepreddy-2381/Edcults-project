package com.edcults.grocerystore.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_images")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String imageType; // e.g., image/jpeg
    private String imageName; // e.g., product1.jpg
    private String imageUrl;  // e.g., /images/product1.jpg

    @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "product_id") // Explicitly specify the foreign key column
    @JsonIgnore 
    private Product product;
}