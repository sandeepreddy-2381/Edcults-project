package com.edcults.grocerystore.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.edcults.grocerystore.dto.CategoryReqRes;
import com.edcults.grocerystore.dto.ReqRes;
import com.edcults.grocerystore.models.Category;
import com.edcults.grocerystore.models.Users;
import com.edcults.grocerystore.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired 
    private CategoryRepository categoryRepository;

    @Autowired
    private UserService userService;

    public Category createCategory(CategoryReqRes categoryReq) throws Exception{        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        ReqRes response = userService.getMyInfo(email);

        Users user = response.getUsers();

        Category category = new Category();
        category.setName(categoryReq.getName());
        category.setCreatedAt(LocalDateTime.now());
        category.setUser(user);
        return categoryRepository.save(category);
    }

    public Category getCategory(Long id) throws Exception{
        return categoryRepository.findById(id)
        .orElseThrow(()->new Exception("CATEGORY-NOT-FOUND"));
    }

    public List<Category> getCategories() throws Exception{
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long id) throws Exception{
        Category category = getCategory(id);
        if (category !=null){
            categoryRepository.deleteById(id);
        }else{
            throw new Exception("CATEGORY-NOT-FOUND");
        }
    }
}
