package com.edcults.grocerystore.dto;

import com.edcults.grocerystore.models.Order;
import com.edcults.grocerystore.models.PaymentInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class PaymentReqRes {
    private String paymentLink;
    private Long orderId;
    private int statusCode;
    private String error;
    private String message;
    private Order order;
    private PaymentInfo paymentInfo;
}
