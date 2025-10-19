package com.telehealth.service;

import com.telehealth.entity.Admin;
import com.telehealth.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    public boolean authenticate(String username, String password) {
        return adminRepository.findByUsername(username)
                .map(admin -> admin.getPassword().equals(password))
                .orElse(false);
    }
    
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}