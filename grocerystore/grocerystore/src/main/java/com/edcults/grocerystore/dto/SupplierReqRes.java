package com.edcults.grocerystore.dto;

import java.util.List;

import com.edcults.grocerystore.models.Address;
import com.edcults.grocerystore.models.ContactInfo;
import com.edcults.grocerystore.models.Supplier;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class SupplierReqRes {
    private String fullname;
    // private String email;
    // private String mobile;
    // private String twitter;
    // private String instagram;
    private ContactInfo contactInfo;
    private Address address;
    private Supplier supplier;
    private String logo;
    private String status;
    private List<Supplier> suppliers;
    private int statusCode;
    private String error;
    private String message;
}
