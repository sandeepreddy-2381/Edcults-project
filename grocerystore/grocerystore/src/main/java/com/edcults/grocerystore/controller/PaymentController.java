package com.edcults.grocerystore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edcults.grocerystore.dto.PaymentReqRes;
import com.edcults.grocerystore.models.PaymentInfo;
import com.edcults.grocerystore.service.PaymentService;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payments/checkout/hosted")
    public ResponseEntity<PaymentReqRes> hostedCheckout(@RequestBody PaymentReqRes req){
        try {
            PaymentReqRes resp = paymentService.createHostedCheckout(req);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        } catch (Exception e) {
            PaymentReqRes resp = new PaymentReqRes();
            // e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/payments/success")
    public ResponseEntity<PaymentReqRes> updatePayment(@RequestBody String session_id){
        PaymentReqRes resp = new PaymentReqRes();
        try {
            PaymentInfo info = paymentService.updatePayment(session_id);
            resp.setPaymentInfo(info);
            resp.setStatusCode(200);
            resp.setMessage("successfully");
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (Exception e) {
            // e.printStackTrace();
            resp.setMessage(e.getMessage());
            return new ResponseEntity<>(resp,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}