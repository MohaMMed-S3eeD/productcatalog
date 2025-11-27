package com.ecom.productcatalog.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ecom.productcatalog.model.Category;
import com.ecom.productcatalog.model.Product;
import com.ecom.productcatalog.repository.ProductRepository;
import com.ecom.productcatalog.repository.categorRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private categorRepository categorRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clear all existing data (Database)
        // Delete products first to avoid cascade issues
        productRepository.deleteAll();
        categorRepository.deleteAll();

        // Create Categories
        Category electronics = new Category();
        electronics.setName("Electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("Home and kitchen");

        categorRepository.saveAll(Arrays.asList(electronics, clothing, home));

        // Create Products
        Product phone = new Product();
        phone.setName("samsung");
        phone.setDescription("is a smart phone");
        phone.setCategory(electronics);
        phone.setPrice(970.99);
        phone.setImgUrl("https://placehold.co/600x400");

        Product labtop = new Product();
        labtop.setName("Dell");
        labtop.setDescription("is a Dell g15 5510");
        labtop.setCategory(electronics);
        labtop.setPrice(20000.99);
        labtop.setImgUrl("https://placehold.co/600x400");

        Product jacket = new Product();
        jacket.setName("Winter jacket");
        jacket.setDescription("Worm and cozy jacket for winter .");
        jacket.setCategory(clothing);
        jacket.setPrice(150.50);
        jacket.setImgUrl("https://placehold.co/600x400");

        Product blender = new Product();
        blender.setName("Blender");
        blender.setDescription("High speed blender for smothing and more .");
        blender.setCategory(home);
        blender.setPrice(450.50);
        blender.setImgUrl("https://placehold.co/600x400");

        productRepository.saveAll(Arrays.asList(phone, labtop, jacket, blender));
        
        System.out.println("Data seeding completed successfully!");
    }

}