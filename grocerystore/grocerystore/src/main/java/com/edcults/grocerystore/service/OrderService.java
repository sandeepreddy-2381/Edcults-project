package com.edcults.grocerystore.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.edcults.grocerystore.dto.OrderReqRes;
import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.models.Cart;
import com.edcults.grocerystore.models.CartItem;
import com.edcults.grocerystore.models.Order;
import com.edcults.grocerystore.models.OrderItem;
import com.edcults.grocerystore.models.Product;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.CartRepository;
import com.edcults.grocerystore.repository.OrderRepository;
import com.edcults.grocerystore.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Autowired 
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    @Transactional
    public Order createOrder(OrderReqRes req) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();

        // Fetch items from cart
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            throw new Exception("CART-NOT-FOUND");
        }

        List<CartItem> cartItems = cart.getItem();
        List<OrderItem> orderItems = convertCartItemsToOrderItems(cartItems);

        // Calculate totals
        Long itemsPrice = calculateItemsPrice(orderItems);
        Integer totalItems = cart.getItem().size();
        Long taxPrice = calculateTaxPrice(itemsPrice);
        Long shippingPrice = calculateShippingPrice();
        Long totalPrice = itemsPrice + taxPrice + shippingPrice;

        // Create and save the order
        Order order = new Order();
        order.setUser(user);
        order.setStatus("Pending");
        order.setCreatedAt(LocalDateTime.now());
        order.setPaidAt(LocalDateTime.now());
        order.setTotalItems(totalItems);
        order.setItemsPrice(itemsPrice);
        order.setTaxPrice(taxPrice);
        order.setShippingPrice(shippingPrice);
        order.setTotalPrice(totalPrice);
        order.setDeliveryAddress(req.getDeliveryAddress());

        // Set the order reference in each OrderItem
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);
        }

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // Clear cart after saving the order
        cartService.clearCart();

        return savedOrder;
    }
    
    private List<OrderItem> convertCartItemsToOrderItems(List<CartItem> cartItems) {
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            orderItems.add(orderItem);
        }
        return orderItems;
    }
    private Long calculateItemsPrice(List<OrderItem> items) {
        return items.stream().mapToLong(OrderItem::getTotalPrice).sum();
    }

    private Long calculateTaxPrice(Long itemsPrice) {
        // Implement tax calculation logic
        return itemsPrice * 10 / 100; // example: 10% tax
    }

    private Long calculateShippingPrice() {
        // Implement shipping price calculation logic
        return 500L; // example: flat shipping fee
    }
    // public Order createOrder(OrderReqRes req) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String email = authentication.getName();
    //     ReqRes response = userService.getMyInfo(email);
    //     Users user = response.getUsers();

    //     Order order = new Order();
    //     order.setUser(user);
    //     order.setTotalPrice(req.getTotalPrice());
    //     order.setStatus("Pending");
    //     order.setCreatedAt(LocalDateTime.now());
    //     order.setPaidAt(LocalDateTime.now());
    //     order.setItems(req.getOrderItems());
    //     order.setTotalItems(req.getTotalItems());
    //     order.setItemsPrice(req.getItemsPrice());
    //     order.setTaxPrice(req.getTaxPrice());
    //     order.setShippingPrice(req.getShippingPrice());
    //     order.setTotalPrice(req.getTotalPrice());
    //     order.setDeliveryAddress(req.getDeliveryAddress());

    //     return orderRepository.save(order);
    // }

    @Transactional
    public Order updateOrder(Long id, OrderReqRes req) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(req.getStatus());
        if ("delivered".equals(req.getStatus())) {
            order.setDeliveredAt(LocalDateTime.now());
            // Decrease stock in products associated with the order
            List<OrderItem> orderItems = order.getItems();
            for (OrderItem orderItem : orderItems) {
                Product product = orderItem.getProduct();
                int quantityOrdered = orderItem.getQuantity();
                int currentStock = product.getStock();
                if (currentStock >= quantityOrdered) {
                    product.setStock(currentStock - quantityOrdered);
                    System.out.println(product);
                    // Save updated product (if necessary)
                    productRepository.save(product);
                } else {
                    throw new RuntimeException("Insufficient stock for product: " + product.getName());
                }
            }
        }
        return orderRepository.save(order);
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus("Cancelled");
        order.setCancelledAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    public List<Order> getMyOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();
        return orderRepository.findByUserId(user.getId());
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrder(Long orderId) throws Exception {
        Optional<Order> cartOpt = orderRepository.findById(orderId);
        if (cartOpt.isEmpty()) {
            throw new Exception("Order-NOT-FOUND");
        }
        return cartOpt.get();
    }
}
