package com.restaurant.controller;

import com.restaurant.dto.request.CapNhatSoLuongRequest;
import com.restaurant.dto.request.GoiMonRequest;
import com.restaurant.dto.response.ApiResponse;
import com.restaurant.entity.HoaDon;
import com.restaurant.exception.ErrorCode;
import com.restaurant.service.PosService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pos")
@RequiredArgsConstructor
public class PosController {

    private final PosService service;

    @PostMapping("/mo-ban/{banId}")
    public ApiResponse<HoaDon> moBan(@PathVariable Long banId) {
        return ApiResponse.<HoaDon>builder()
                .code(ErrorCode.SUCCESS.getCode())
                .message("Mở bàn thành công")
                .result(service.moBan(banId))
                .build();
    }

    @PostMapping("/goi-mon")
    public ApiResponse<?> goiMon(@RequestBody GoiMonRequest request) {
        service.goiMon(request);
        return ApiResponse.builder()
                .code(ErrorCode.SUCCESS.getCode())
                .message("Thêm món thành công")
                .result(null)
                .build();
    }

    @PostMapping("/thanh-toan/{hoaDonId}")
    public ApiResponse<Double> thanhToan(@PathVariable Long hoaDonId) {
        return ApiResponse.<Double>builder()
                .code(ErrorCode.SUCCESS.getCode())
                .message("Thanh toán thành công")
                .result(service.thanhToan(hoaDonId))
                .build();
    }
    @PostMapping("/cap-nhat-so-luong")
    public ApiResponse<?> capNhatSoLuong(@RequestBody CapNhatSoLuongRequest request) {

        service.capNhatSoLuong(request.getCthdId(), request.getSoLuong());

        return ApiResponse.builder()
                .code(ErrorCode.SUCCESS.getCode())
                .message("Cập nhật số lượng thành công")
                .result(null)
                .build();
    }
    @DeleteMapping("/xoa-mon/{cthdId}")
    public ApiResponse<?> xoaMon(@PathVariable Long cthdId) {

        service.xoaMonKhoiHoaDon(cthdId);

        return ApiResponse.builder()
                .code(ErrorCode.SUCCESS.getCode())
                .message("Xóa món thành công")
                .result(null)
                .build();
    }
}