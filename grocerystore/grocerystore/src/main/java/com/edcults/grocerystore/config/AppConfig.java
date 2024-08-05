package com.edcults.grocerystore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
public class AppConfig {
    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${client.base.url}")
    private String clientBaseUrl;
}