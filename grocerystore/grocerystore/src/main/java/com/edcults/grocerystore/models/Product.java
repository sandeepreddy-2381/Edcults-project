package com.edcults.grocerystore.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Integer stock = 0;

    private String brand;

    private Boolean available;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    private Double ratings;

    private Integer numOfReviews;

    private String tags;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "created_by")
    @JsonIgnore
    private Users createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "updated_by")
    @JsonIgnore
    private Users updatedBy;

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "category")
    private Category category;

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "supplier")
    private Supplier supplier;

    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price + ", stock="
                + stock + ", brand=" + brand + ", available=" + available + ", image=" + images + ", tags=" + tags + "]";
    }
}
