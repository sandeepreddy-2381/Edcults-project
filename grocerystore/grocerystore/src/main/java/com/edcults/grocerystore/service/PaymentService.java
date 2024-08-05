package com.edcults.grocerystore.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edcults.grocerystore.config.AppConfig;
import com.edcults.grocerystore.dto.PaymentReqRes;
import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.models.Order;
import com.edcults.grocerystore.models.OrderItem;
import com.edcults.grocerystore.models.PaymentInfo;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.OrderRepository;
import com.edcults.grocerystore.repository.PaymentRepository;
import com.edcults.grocerystore.repository.UsersRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService {

    @Autowired
    private AppConfig appConfig;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UsersRepository userRepo;

    @Transactional
    public PaymentReqRes createHostedCheckout(PaymentReqRes req) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);
        Users user = response.getUsers();

        Stripe.apiKey = appConfig.getStripeApiKey();
        // String clientUrl= appConfig.getClientBaseUrl();
        // Start by finding an existing customer record from Stripe or creating a new one if needed
        String customer = findOrCreateCustomer(user.getEmail(), user.getFullname());

        // Create a checkout session by adding the details of the checkout
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customer)
                .setSuccessUrl("http://localhost:5173/thankyou?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:5173/thankyou");
                // .setSuccessUrl(clientUrl + "/success?session_id={CHECKOUT_SESSION_ID}")
                // .setCancelUrl(clientUrl + "/failure");
        Order order = orderRepo.findById(req.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        for (OrderItem item : order.getItems()) {
            paramsBuilder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity((long) item.getQuantity())
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .putMetadata("app_id", "" + item.getId())
                                                            .setName(item.getProduct().getName())
                                                            .build()
                                            )
                                            .setCurrency("usd")
                                            .setUnitAmount(item.getProduct().getPrice().longValue()*100)
                                            .build()
                            )
                            .build()
            );
        }

        Session session = Session.create(paramsBuilder.build());
        PaymentReqRes resp = new PaymentReqRes();
        resp.setOrder(order);
        resp.setPaymentLink(session.getUrl());
        return resp;
    }

    public static Customer findCustomerByEmail(String email) throws StripeException {
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + email + "'")
                        .build();

        CustomerSearchResult result = Customer.search(params);

        return result.getData().size() > 0 ? result.getData().get(0) : null;
    }

    public String findOrCreateCustomer(String email, String name) throws StripeException {
        Users user = userRepo.findByEmail(email)
        .orElseThrow();
        if ("".equals(user.getCustomer())){  
                Customer customer;
                CustomerCreateParams customerCreateParams = CustomerCreateParams.builder()
                        .setName(name)
                        .setEmail(email)
                        .build();
        
                customer = Customer.create(customerCreateParams);
                user.setCustomer(customer.getId());
                userRepo.save(user);
                return customer.getId();
        }else{
                return user.getCustomer();
        }

        // // If no existing customer was found, create a new record
        // if (result.getData().size() == 0) {
        // } else {
        //     customer = result.getData().get(0);
        // }
    }

    public PaymentInfo updatePayment(String sessionId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);

        Users user = response.getUsers();

        PaymentInfo payment = new PaymentInfo();
        payment.setPaymentId(sessionId);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setStatus("success");
        payment.setUser(user);
        return paymentRepository.save(payment);
    }
}
