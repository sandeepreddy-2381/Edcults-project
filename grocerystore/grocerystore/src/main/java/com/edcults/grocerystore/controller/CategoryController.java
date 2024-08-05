package com.edcults.grocerystore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edcults.grocerystore.dto.CategoryReqRes;
import com.edcults.grocerystore.models.Category;
import com.edcults.grocerystore.service.CategoryService;


@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    @PreAuthorize(value="hasRole('ADMIN')")
    public ResponseEntity<CategoryReqRes> createCategory(@RequestBody CategoryReqRes req) {
        CategoryReqRes resp = new CategoryReqRes();
        try {
            Category category = categoryService.createCategory(req);
            resp.setCategory(category);
            resp.setMessage("Created Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize(value="hasRole('ADMIN')")
    public ResponseEntity<CategoryReqRes> category(@PathVariable Long id) {
        CategoryReqRes resp = new CategoryReqRes();
        try {
            Category category = categoryService.getCategory(id);
            resp.setCategory(category);
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

    @DeleteMapping("/{id}")
    @PreAuthorize(value="hasRole('ADMIN')")
    public ResponseEntity<CategoryReqRes> deleteCategory(@PathVariable Long id) {
        CategoryReqRes resp = new CategoryReqRes();
        try {
            categoryService.deleteCategory(id);
            resp.setMessage("Deleted Successfully");
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
    public ResponseEntity<CategoryReqRes> categories() {
        CategoryReqRes resp = new CategoryReqRes();
        try {
            List<Category> category = categoryService.getCategories();
            resp.setCategories(category);
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
}
