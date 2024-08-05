package com.edcults.grocerystore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edcults.grocerystore.dto.OrderReqRes;
import com.edcults.grocerystore.models.Order;
import com.edcults.grocerystore.service.OrderService;


@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/new")
    public ResponseEntity<OrderReqRes> newOrder(@RequestBody OrderReqRes req) {
        OrderReqRes resp=new OrderReqRes();
        try {
            Order order = orderService.createOrder(req);
            resp.setOrder(order);
            resp.setStatusCode(200);
            resp.setMessage("successfully ordered");
        } catch (Exception e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderReqRes> updateOrder(@PathVariable Long id, @RequestBody OrderReqRes req) {
        OrderReqRes resp = new OrderReqRes();
        try {
            Order order = orderService.updateOrder(id, req);
            resp.setOrder(order);
            resp.setStatusCode(200);
            resp.setMessage("successfully updated");
        } catch (Exception e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @DeleteMapping("/cancel/{orderId}")
    public ResponseEntity<OrderReqRes> cancelOrder(@PathVariable Long orderId) {
        OrderReqRes resp = new OrderReqRes();
        try {
            orderService.cancelOrder(orderId);
            resp.setStatusCode(200);
            resp.setMessage("successfully cancelled");
        } catch (Exception e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<OrderReqRes> myOrders() {
        OrderReqRes resp = new OrderReqRes();
        try {
            List<Order> orders = orderService.getMyOrders();
            resp.setOrderList(orders);
            resp.setStatusCode(200);
            resp.setMessage("successfully retrieved");
        } catch (Exception e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderReqRes> getAllOrders() {
        OrderReqRes resp = new OrderReqRes();
        try {
            List<Order> orders = orderService.getAllOrders();
            resp.setOrderList(orders);
            resp.setStatusCode(200);
            resp.setMessage("successfully retrieved");
        } catch (Exception e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderReqRes> getCart(@PathVariable Long id) {
        OrderReqRes resp = new OrderReqRes();
        try {
            Order order = orderService.getOrder(id);
            resp.setOrder(order);
            resp.setStatusCode(200);
            resp.setMessage("successfully cleared");
            return new ResponseEntity<>(resp,HttpStatus.OK);
        }catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
