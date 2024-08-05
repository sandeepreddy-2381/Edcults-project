package com.edcults.grocerystore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.PasswordResetToken;
import com.edcults.grocerystore.models.Users;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUser(Users user);
}