package com.edcults.grocerystore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edcults.grocerystore.dto.CartReqRes;
import com.edcults.grocerystore.models.Cart;
import com.edcults.grocerystore.models.CartItem;
import com.edcults.grocerystore.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {
     @Autowired
    private CartService cartService;

    @PutMapping("/add")
    public ResponseEntity<CartReqRes> addItemToCart(@RequestBody CartReqRes req) {
        CartReqRes resp = new CartReqRes();
        try {
            CartItem cartItem = cartService.addItemToCart(req);
            resp.setCartItem(cartItem);
            resp.setStatusCode(200);
            resp.setMessage("successfully added");
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

    @PutMapping("/update/{id}")
    public ResponseEntity<CartReqRes> updateCartItemQuantity(@PathVariable Long id, @RequestBody CartReqRes req) {
        CartReqRes resp = new CartReqRes();
        try {
            CartItem cartItem = cartService.updateCartItemQuantity(id, req.getQuantity());
            resp.setCartItem(cartItem);
            resp.setStatusCode(200);
            resp.setMessage("successfully updated");
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CartReqRes> removeCartItem(@PathVariable Long id) {
        CartReqRes resp = new CartReqRes();
        try {
            cartService.removeCartFromItem(id);
            resp.setStatusCode(200);
            resp.setMessage("successfully removed");
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<CartReqRes> clearCart() {
        CartReqRes resp = new CartReqRes();
        try {
            cartService.clearCart();
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

    @GetMapping("")
    public ResponseEntity<CartReqRes> getUserCart() {
        CartReqRes resp = new CartReqRes();
        try {
            Cart cart = cartService.getCartByUserId();
            cart.setTotal(cartService.calculateTotals(cart));
            resp.setCart(cart);
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

    @GetMapping("/{id}")
    public ResponseEntity<CartReqRes> getCart(@PathVariable Long id) {
        CartReqRes resp = new CartReqRes();
        try {
            Cart cart = cartService.getCart(id);
            cart.setTotal(cartService.calculateTotals(cart));
            resp.setCart(cart);
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
