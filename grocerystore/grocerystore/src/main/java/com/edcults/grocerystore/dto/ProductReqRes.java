package com.edcults.grocerystore.dto;

import java.util.List;

import com.edcults.grocerystore.models.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class ProductReqRes {
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String brand;
    private String status;
    private Boolean available;
    private String tags;
    private List<String> image;
    private Long supplierId;
    private Long categoryId;
    private List<Product> products;
    private Product product;
    private int statusCode;
    private String error;
    private String message;
}
