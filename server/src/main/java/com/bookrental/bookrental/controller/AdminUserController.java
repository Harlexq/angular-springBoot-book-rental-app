package com.bookrental.bookrental.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.bookrental.bookrental.model.AdminUsers;
import com.bookrental.bookrental.repository.AdminUserRepository;

@RestController
public class AdminUserController {

    @Autowired
    private AdminUserRepository adminRepo;

    @GetMapping("/adminUserReadAll")
    public List<AdminUsers> adminUserReadAll() {
        return adminRepo.findAll();
    }

    @PostMapping("/adminUserCreate")
    public AdminUsers adminUserCreate(@RequestBody AdminUsers adminUser) {

        int sizeAdmin = adminSize();
        adminUser.id = sizeAdmin + 1;

        return adminRepo.save(adminUser);
    }

    public int adminSize() {
        return adminRepo.findAll().size();
    }

}