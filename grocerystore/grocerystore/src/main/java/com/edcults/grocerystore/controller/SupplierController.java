package com.edcults.grocerystore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edcults.grocerystore.dto.SupplierReqRes;
import com.edcults.grocerystore.models.Supplier;
import com.edcults.grocerystore.repository.SupplierRepository;
import com.edcults.grocerystore.service.SupplierService;
import com.edcults.grocerystore.service.UserService;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @Autowired
    SupplierRepository supplierRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    @PreAuthorize(value="hasRole('ADMIN')")
    public ResponseEntity<SupplierReqRes> searchSupplier(@RequestParam(required = false) String keyword)throws Exception {
        SupplierReqRes resp = new SupplierReqRes();
        if (keyword == null || keyword.isEmpty()) {
            resp.setMessage("Keyword parameter is missing");
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }  
        try {
            List<Supplier> suppliers = supplierService.searchSupplier(keyword);
            resp.setSuppliers(suppliers);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    @PreAuthorize(value="hasRole('ADMIN')")
    public ResponseEntity<SupplierReqRes> suppliers(){
        SupplierReqRes resp = new SupplierReqRes();
        try {
            List<Supplier> suppliers = supplierService.getAllSuppliers();
            resp.setSuppliers(suppliers);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize(value="hasRole('ADMIN')")
    public ResponseEntity<SupplierReqRes> supplier(@PathVariable Long id){
        SupplierReqRes resp = new SupplierReqRes();
        try {
            Supplier supplier = supplierService.getSupplier(id);
            resp.setSupplier(supplier);
            resp.setMessage("Retrieved Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}")
    @PreAuthorize(value="hasRole('ADMIN')")
    public ResponseEntity<SupplierReqRes> updateSupplier(@PathVariable Long id, @RequestBody SupplierReqRes req) {
        SupplierReqRes resp = new SupplierReqRes();
        try {
            Supplier supplier = supplierService.updateSupplier(id,req);
            resp.setSupplier(supplier);
            resp.setMessage("Updated Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            resp.setStatusCode(400);
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            resp.setStatusCode(500);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
