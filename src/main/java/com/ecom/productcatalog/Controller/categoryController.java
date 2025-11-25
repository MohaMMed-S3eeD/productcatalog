package com.ecom.productcatalog.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.productcatalog.model.Category;
import com.ecom.productcatalog.service.categoryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/category")
public class categoryController {
    
    @Autowired
    private categoryService categoryService;

    @GetMapping("/allcategory")
    public List<Category> getAllCategory() {
        return categoryService.getAllCategory();
    }

}