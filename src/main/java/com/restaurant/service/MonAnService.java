package com.restaurant.service;

import com.restaurant.dto.request.MonAnRequest;
import com.restaurant.dto.response.MonAnResponse;
import com.restaurant.entity.MonAn;
import com.restaurant.exception.AppException;
import com.restaurant.exception.ErrorCode;
import com.restaurant.repository.CTHDRepository;
import com.restaurant.repository.MonAnRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonAnService {

    private final MonAnRepository repository;
    private final CTHDRepository cthdRepository;

    public MonAnResponse create(MonAnRequest request) {
        MonAn mon = new MonAn();
        mon.setTenMon(request.getTenMon());
        mon.setGia(request.getGia());
        mon.setActive(request.getActive());
        mon.setImageUrl(request.getImageUrl());
        mon.setCategory(request.getCategory()); // ✅ thêm loại món

        repository.save(mon);

        return MonAnResponse.builder()
                .id(mon.getId())
                .tenMon(mon.getTenMon())
                .gia(mon.getGia())
                .imageUrl(mon.getImageUrl())
                .active(mon.getActive())
                .category(mon.getCategory()) // ✅ trả về category
                .build();
    }

    public List<MonAnResponse> getAll() {
        return repository.findAll().stream()
                .map(mon -> MonAnResponse.builder()
                        .id(mon.getId())
                        .tenMon(mon.getTenMon())
                        .gia(mon.getGia())
                        .imageUrl(mon.getImageUrl())
                        .active(mon.getActive())
                        .category(mon.getCategory()) // ✅ trả về category
                        .build())
                .toList();
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new AppException(ErrorCode.MON_AN_NOT_FOUND);
        }

        // Xóa chi tiết hóa đơn trước
        cthdRepository.deleteByMonAnId(id);

        // Xóa món ăn
        repository.deleteById(id);
    }

    public MonAnResponse update(Long id, MonAnRequest request) {
        MonAn mon = repository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.MON_AN_NOT_FOUND));

        mon.setTenMon(request.getTenMon());
        mon.setGia(request.getGia());
        mon.setActive(request.getActive());
        mon.setImageUrl(request.getImageUrl());
        mon.setCategory(request.getCategory()); // ✅ update category

        repository.save(mon);

        return MonAnResponse.builder()
                .id(mon.getId())
                .tenMon(mon.getTenMon())
                .gia(mon.getGia())
                .imageUrl(mon.getImageUrl())
                .active(mon.getActive())
                .category(mon.getCategory()) // ✅ trả về category
                .build();
    }

    public List<Object[]> getTop5MonAn() {
        return cthdRepository.findTopMonAn(PageRequest.of(0, 5));
    }
}