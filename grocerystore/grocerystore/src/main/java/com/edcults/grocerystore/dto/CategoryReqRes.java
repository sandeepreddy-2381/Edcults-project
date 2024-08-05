package com.edcults.grocerystore.dto;

import java.util.List;

import com.edcults.grocerystore.models.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class CategoryReqRes {
    private String name;
    private Category category;
    private List<Category> categories;
    private int statusCode;
    private String error;
    private String message;
}
