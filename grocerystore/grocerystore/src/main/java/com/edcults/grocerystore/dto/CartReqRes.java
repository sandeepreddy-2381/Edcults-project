package com.edcults.grocerystore.dto;

import com.edcults.grocerystore.models.Cart;
import com.edcults.grocerystore.models.CartItem;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class CartReqRes {
    private Long productId;
    private Integer quantity;
    private int statusCode;
    private String error;
    private String message;
    private Cart cart;
    private CartItem cartItem;
}
