package com.edcults.grocerystore.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edcults.grocerystore.dto.SupplierReqRes;
import com.edcults.grocerystore.models.Address;
import com.edcults.grocerystore.models.Supplier;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.AddressRepository;
import com.edcults.grocerystore.repository.SupplierRepository;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private AddressRepository addressRepository;

    public Supplier createSupplier(SupplierReqRes req, Users user) {
        Supplier supplier = new Supplier();
        if (req.getAddress()!=null){
            Address address = addressRepository.save(req.getAddress());
            supplier.setAddress(address);
        }
        supplier.setUser(user);
        supplier.setStatus("pending");
        supplier.setFullname(req.getFullname());
        supplier.setContactInfo(req.getContactInfo());
        supplier.setLogo(req.getLogo());
        supplier.setCreatedAt(LocalDateTime.now());
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(Long supplierId, SupplierReqRes req) throws Exception {

        Supplier supplier = getSupplier(supplierId);
        if (supplier==null){
            throw new Exception("SUPPLIER-NOT-FOUND");
        }

        if(req.getAddress()  != null){
            supplier.setAddress(req.getAddress());
        }

        if(req.getStatus() != null){
            supplier.setStatus(req.getStatus());
        }

        if(req.getLogo() != null)
            supplier.setLogo(req.getLogo());

            
        if(req.getFullname() != null)
            supplier.setFullname(req.getFullname());

        if(req.getContactInfo() != null)
            supplier.setContactInfo(req.getContactInfo());

        return supplierRepository.save(supplier);
    }

    public void deleteSupplier(Long supplierId) throws Exception {
        Supplier supplier = getSupplier(supplierId);
        if (supplier==null){
            throw new Exception("SUPPLIER-NOT-FOUND");
        }

        supplierRepository.delete(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public List<Supplier> searchSupplier(String keyword) throws Exception {
        if (keyword == null || keyword.trim().isEmpty()) {
            throw new IllegalArgumentException("Keyword must not be null or empty");
        }
        return supplierRepository.searchByKeyword(keyword);
    }

    public Supplier getSupplier(Long id) throws Exception {
        Optional<Supplier> opt = supplierRepository.findById(id);

        if(opt.isEmpty())
            throw new Exception("SUPPLIER-NOT-FOUND");

        return opt.get();
    }

    public Optional<Supplier> getSupplierByUserId(Long userId)throws Exception {
        return supplierRepository.findByUserId(userId);
    }

    public List<Supplier> findSupplierByName(String name) {
        return supplierRepository.findByName(name);
    }
}
