package com.ecom.productcatalog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.productcatalog.model.Category;
import com.ecom.productcatalog.repository.categorRepository;

@Service
public class categoryService {
    
    @Autowired
    private categorRepository categorRepository;

    public List<Category> getAllCategory() {
        return categorRepository.findAll();
    }
}