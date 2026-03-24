package com.restaurant.service;

import com.restaurant.entity.NguoiDung;
import com.restaurant.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public NguoiDung checkLogin(String username, String password) {
        Optional<NguoiDung> optionalNguoiDung = nguoiDungRepository.findByUsername(username);

        if (optionalNguoiDung.isPresent()) {
            NguoiDung user = optionalNguoiDung.get();
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }

    public NguoiDung getById(Long id) {
        return nguoiDungRepository.findById(id).orElse(null);
    }
}