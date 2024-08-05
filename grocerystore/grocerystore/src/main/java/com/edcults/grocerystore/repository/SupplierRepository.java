package com.edcults.grocerystore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edcults.grocerystore.models.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier,Long> {
    @Query("SELECT s FROM Supplier s WHERE LOWER(s.fullname) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            " OR LOWER(s.contactInfo.mobile) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            " OR LOWER(s.contactInfo.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Supplier> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT s FROM Supplier s WHERE s.fullname = :fullname")
    List<Supplier> findByName(@Param("fullname") String fullname);

    @Query("SELECT s FROM Supplier s WHERE s.user.id = :user")
    Optional<Supplier> findByUserId(@Param("user") Long user);
}
