package com.edcults.grocerystore.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.edcults.grocerystore.dto.CartReqRes;
import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.models.Cart;
import com.edcults.grocerystore.models.CartItem;
import com.edcults.grocerystore.models.Product;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.CartItemRepository;
import com.edcults.grocerystore.repository.CartRepository;
import com.edcults.grocerystore.repository.ProductRepository;
import com.edcults.grocerystore.repository.UsersRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {
     @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UsersRepository usersRepo;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public CartItem addItemToCart(CartReqRes req) throws Exception {
        // Fetch authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();

        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setTotal((long)0);
            cart = cartRepository.save(cart);
        }

        // Fetch product by ID
        Optional<Product> productOpt = productRepository.findById(req.getProductId());
        if (productOpt.isEmpty()) {
            throw new Exception("PRODUCT-NOT-FOUND");
        }
        Product product = productOpt.get();

         // Check if the product already exists in the cart
         for (CartItem cartItem : cart.getItem()) {
            if (cartItem.getProduct().equals(product)) {
                // Update quantity if the product is already in the cart
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(), newQuantity);
            }
        }

        // Create a new cart item
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(req.getQuantity());
        cartItem.setTotalPrice((long) (req.getQuantity() * product.getPrice()));
        cart.getItem().add(cartItem);

        // Save and return the new cart item
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(cartItemId);
        if (cartItemOpt.isEmpty()) {
            throw new Exception("CARTITEM-NOT-FOUND");
        }

        CartItem cartItem = cartItemOpt.get();
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice((long) (quantity * cartItem.getProduct().getPrice()));
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public Cart removeCartFromItem(Long cartItemId) throws Exception {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(cartItemId);
        if (cartItemOpt.isEmpty()) {
            throw new Exception("CARTITEM-NOT-FOUND");
        }

        CartItem cartItem = cartItemOpt.get();
        Cart cart = cartItem.getCart();
        cart.getItem().remove(cartItem);
        cartItemRepository.delete(cartItem);
        return cartRepository.save(cart);
    }

    @Transactional
    public Long calculateTotals(Cart cart) {
        return cart.getItem().stream()
                .mapToLong(CartItem::getTotalPrice)
                .sum();
    }

    @Transactional
    public Cart getCart(Long cartId) throws Exception {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        if (cartOpt.isEmpty()) {
            throw new Exception("CART-NOT-FOUND");
        }
        return cartOpt.get();
    }

    @Transactional
    public Cart getCartByUserId() throws Exception {
        // Fetch authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            throw new Exception("CART-NOT-FOUND");
        }
        return cart;
    }

    @Transactional
    public Cart clearCart() throws Exception {
        // Fetch authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();

        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            throw new Exception("CART-NOT-FOUND");
        }
        cart.getItem().clear();
        return cartRepository.save(cart);
    }
}
