package com.edcults.grocerystore.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.dto.ReviewReqRes;
import com.edcults.grocerystore.models.Product;
import com.edcults.grocerystore.models.Review;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.ProductRepository;
import com.edcults.grocerystore.repository.ReviewRepository;
import com.edcults.grocerystore.repository.UsersRepository;

@Service
public class ReviewService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public void createOrUpdateReview(ReviewReqRes req) throws Exception{
        Authentication authentication =SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();

        Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = product.getReviews().stream()
                .filter(r -> r.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElse(new Review());

        review.setUser(user);
        review.setName(user.getFullname());
        review.setRating(req.getRating());
        review.setComment(req.getComment());
        review.setProduct(product);

        if (review.getId() == null) {
            product.getReviews().add(review);
        }

        updateProductRatings(product);

        productRepository.save(product);
    }

    public List<Review> getProductReviews(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return product.getReviews();
    }

    @Transactional
    public void deleteReview(Long productId, Long reviewId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setReviews(
                product.getReviews().stream()
                        .filter(review -> !review.getId().equals(reviewId))
                        .collect(Collectors.toList())
        );

        updateProductRatings(product);

        productRepository.save(product);
    }

    private void updateProductRatings(Product product) {
        int numOfReviews = product.getReviews().size();
        double avgRating = product.getReviews().stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);

        product.setNumOfReviews(numOfReviews);
        product.setRatings(avgRating);
    }
}
