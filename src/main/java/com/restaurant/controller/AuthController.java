package com.restaurant.controller;

import com.restaurant.entity.NguoiDung;
import com.restaurant.service.NguoiDungService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {

    @Autowired
    private NguoiDungService nguoiDungService;

    @PostMapping("/login")
    public String login(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        HttpSession session,
                        RedirectAttributes redirectAttributes) {

        NguoiDung user = nguoiDungService.checkLogin(password, password);

        if (user != null) {
            session.setAttribute("user", user);

            if ("ADMIN".equals(user.getRole().toString())) {
                return "redirect:/admin";
            } else {
                return "redirect:/cashier";
            }
        } else {
            redirectAttributes.addFlashAttribute("error", "Tài khoản hoặc mật khẩu không chính xác!");
            return "redirect:/login";
        }
    }
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}