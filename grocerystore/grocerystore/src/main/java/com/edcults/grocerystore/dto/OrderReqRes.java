package com.edcults.grocerystore.dto;

import java.util.List;

import com.edcults.grocerystore.models.Address;
import com.edcults.grocerystore.models.Order;
import com.edcults.grocerystore.models.OrderItem;
import com.edcults.grocerystore.models.PaymentInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class OrderReqRes {
    private Address deliveryAddress;
    private PaymentInfo paymentInfo;
    private Long itemsPrice;
    private Long taxPrice;
    private Long shippingPrice;
    private Long totalPrice;
    private String status;
    private int statusCode;
    private String error;
    private String message;
    private Order order;
    private List<Order> orderList;
    private OrderItem orderItem;
    private List<OrderItem> orderItems;
    private Integer totalItems;
}
