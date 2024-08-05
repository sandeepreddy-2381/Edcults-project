package com.edcults.grocerystore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.edcults.grocerystore.service.OurUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
        .cors(Customizer.withDefaults())
        .authorizeHttpRequests(Request->Request  
                .requestMatchers("/auth/**","/public/**","/categories","/products","/products/search","/products/images/{id}","/products/category/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/products/{id}").permitAll()
                .requestMatchers("/categories/**","/orders").hasAuthority("ADMIN")
                .requestMatchers("/products/**","/suppliers/**").hasAnyAuthority("ADMIN","SUPPLIER")
                .requestMatchers(HttpMethod.PATCH,"/orders/{id}").hasAuthority("ADMIN")
                .requestMatchers("/cart/**","/orders/**").hasAnyAuthority("ADMIN","USER")
                .requestMatchers("/payments/**").hasAnyAuthority("USER")
                .anyRequest().authenticated())
                .sessionManagement(manager->manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider()).addFilterBefore(
            jwtAuthFilter,UsernamePasswordAuthenticationFilter.class
        );
        return httpSecurity.build();
    }

    @Bean 
    AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(ourUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }
     // // .requestMatchers("/auth/**","/public/**","/categories","/products","/cart/**").permitAll()
                // // .requestMatchers("/admin/**").hasAnyAuthority("ADMIN")
                // // .requestMatchers("/categories/**").hasAuthority("ADMIN") 
                // // .requestMatchers("/cart/**").hasAnyAuthority("ADMIN","USER")
                // // .requestMatchers("/orders/**").hasAnyAuthority("ADMIN","USER")
                // // .requestMatchers("/supplier/**","/products/**").hasAnyAuthority("ADMIN","SUPPLIER")
                // // .requestMatchers("/user/**").authenticated()
                // .requestMatchers("/auth/**", "/public/**").permitAll()
                // .requestMatchers("/categories", "/products").permitAll()
                // .requestMatchers("/cart/**").hasAnyAuthority("USER", "ADMIN")
                // .requestMatchers("/orders/**").hasAnyAuthority("USER", "ADMIN")
                // .requestMatchers("/user/**").hasAuthority("USER")
                // .requestMatchers("/admin/**").hasAuthority("ADMIN")
                // .requestMatchers("/categories/**").hasAuthority("ADMIN")
                // .requestMatchers("/products/**").hasAnyAuthority("ADMIN", "SUPPLIER")
                // .requestMatchers("/supplier/**").hasAnyAuthority("ADMIN", "SUPPLIER")
}
