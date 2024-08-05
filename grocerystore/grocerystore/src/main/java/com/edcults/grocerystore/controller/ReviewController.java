package com.edcults.grocerystore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edcults.grocerystore.dto.ReviewReqRes;
import com.edcults.grocerystore.models.Review;
import com.edcults.grocerystore.service.ReviewService;

@RestController
@RequestMapping("/products")
public class ReviewController {
    @Autowired
    private ReviewService productReviewService;

    @PostMapping("/reviews/create")
    public ResponseEntity<ReviewReqRes> createProductReview(@RequestBody ReviewReqRes req) {
        ReviewReqRes resp = new ReviewReqRes();
        try {
            productReviewService.createOrUpdateReview(req);
            resp.setMessage("Created Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            // e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reviews/{productId}")
    public ResponseEntity<ReviewReqRes> getProductReviews(@PathVariable Long productId) {
        ReviewReqRes resp = new ReviewReqRes();
        try {
            List<Review> reviews = productReviewService.getProductReviews(productId);
            resp.setReviews(reviews);
            resp.setMessage("Fetched Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            // e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reviews/{productId}/{reviewId}")
    public ResponseEntity<ReviewReqRes> deleteReview(@PathVariable Long productId,@PathVariable Long reviewId) {
        ReviewReqRes resp = new ReviewReqRes();
        try {
            productReviewService.deleteReview(productId, reviewId);
            resp.setMessage("Deleted Successfully");
            resp.setStatusCode(200);
            return new ResponseEntity<>(resp,HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            // e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
