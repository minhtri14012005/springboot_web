package com.restaurant.controller;

import com.restaurant.dto.request.LoginRequest;
import com.restaurant.dto.response.ApiResponse;
import com.restaurant.dto.response.NguoiDungResponse;
import com.restaurant.entity.NguoiDung;
import com.restaurant.exception.ErrorCode;
import com.restaurant.service.NguoiDungService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // CHỈNH: Trả về JSON thay vì file HTML
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private NguoiDungService nguoiDungService;

    @PostMapping("/login")
    public ApiResponse<NguoiDungResponse> login(@RequestBody LoginRequest request, HttpSession session) {
        // Gọi Service. Nếu sai, AppException sẽ tự động được GlobalExceptionHandler xử lý
        NguoiDung user = nguoiDungService.checkLogin(request.getUsername(), request.getPassword());

        // Lưu session để quản lý đăng nhập
        session.setAttribute("user", user);

        // Trả về cấu trúc ApiResponse thống nhất
        return ApiResponse.<NguoiDungResponse>builder()
                .code(ErrorCode.SUCCESS.getCode())
                .message("Đăng nhập thành công")
                .result(NguoiDungResponse.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(HttpSession session) {
        session.invalidate(); // Xóa session
        return ApiResponse.<String>builder()
                .code(ErrorCode.SUCCESS.getCode())
                .message("Đăng xuất thành công")
                .build();
    }
}