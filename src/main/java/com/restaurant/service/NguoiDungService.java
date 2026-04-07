package com.restaurant.service;

import com.restaurant.entity.NguoiDung;
import com.restaurant.entity.Role;
import com.restaurant.repository.NguoiDungRepository;
import com.restaurant.exception.AppException; // SỬA: Import AppException
import com.restaurant.exception.ErrorCode;    // SỬA: Import ErrorCode
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.restaurant.dto.response.NguoiDungResponse;
import com.restaurant.dto.request.NguoiDungRequest;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    private NguoiDungResponse mapToResponse(NguoiDung user) {
        return NguoiDungResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public List<NguoiDungResponse> getAllUsers() {
        return nguoiDungRepository.findAll().stream()
                .map(this::mapToResponse) // SỬA: Dùng luôn hàm mapToResponse cho gọn
                .collect(Collectors.toList());
    }

    public NguoiDungResponse createUser(NguoiDungRequest request) {
        // (Tùy chọn) Kiểm tra nếu username đã tồn tại
        if (nguoiDungRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION); // Hoặc tạo thêm mã USER_EXISTED
        }

        NguoiDung user = new NguoiDung();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setRole(Role.valueOf(request.getRole()));

        user = nguoiDungRepository.save(user);
        return mapToResponse(user);
    }

    public void deleteUser(Long id) {
        // VỊ TRÍ 1: Kiểm tra trước khi xóa
        if (!nguoiDungRepository.existsById(id)) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        nguoiDungRepository.deleteById(id);
    }

    public NguoiDungResponse updateUser(Long id, NguoiDungRequest request) {
        // VỊ TRÍ 2: Thay RuntimeException bằng AppException
        NguoiDung user = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        user.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(request.getPassword());
        }
        user.setRole(Role.valueOf(request.getRole()));

        user = nguoiDungRepository.save(user);
        return mapToResponse(user);
    }

    public NguoiDung checkLogin(String username, String password) {
        // VỊ TRÍ 3: Xử lý logic đăng nhập bằng Exception
        NguoiDung user = nguoiDungRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!user.getPassword().equals(password)) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return user;
    }

    public NguoiDung getById(Long id) {
        return nguoiDungRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
}