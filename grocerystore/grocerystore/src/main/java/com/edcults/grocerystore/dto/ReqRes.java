package com.edcults.grocerystore.dto;

import java.util.List;

import com.edcults.grocerystore.models.Users;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class ReqRes {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String fullname;
    private String role;
    private String email;
    private String password;
    private Users users;
    private List<Users> usersList;
}