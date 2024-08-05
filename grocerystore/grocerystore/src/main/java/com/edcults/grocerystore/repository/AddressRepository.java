package com.edcults.grocerystore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edcults.grocerystore.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{
    
}
