package com.edcults.grocerystore.dto;

import java.util.List;

import com.edcults.grocerystore.models.Review;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReviewReqRes {
    private int statusCode;
    private String error;
    private String message;
    private String comment;
    private Double rating;
    private Review review;
    private Long productId;
    private List<Review> reviews;
}
