package com.edcults.grocerystore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.dto.SupplierReqRes;
import com.edcults.grocerystore.models.ContactInfo;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.service.SupplierService;
import com.edcults.grocerystore.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService userService;
    @Autowired
    private SupplierService supplierService;
    
    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes req) {
        ReqRes resp = userService.register(req);
        if("SUPPLIER".equals(req.getRole())){
            SupplierReqRes supplierReq = new SupplierReqRes();
            ContactInfo contactInfo = new ContactInfo();
            contactInfo.setEmail(req.getEmail());
            supplierReq.setFullname(req.getFullname());
            supplierReq.setContactInfo(contactInfo);
            supplierService.createSupplier(supplierReq, resp.getUsers());                   
        }
        return ResponseEntity.ok(resp);
    }
    
    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userService.login(req));
    }
    
        @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(userService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());

    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody Users reqres){
        return ResponseEntity.ok(userService.updateUser(userId, reqres));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUSer(@PathVariable Integer userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @PostMapping("/auth/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        ReqRes resp = new ReqRes();
        try {
            userService.forgotPassword(email);
            resp.setMessage("Sent Link Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        ReqRes resp = new ReqRes();
        try {
            userService.resetPassword(token, newPassword);
            resp.setMessage("Sent Link Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
