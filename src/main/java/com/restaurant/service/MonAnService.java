package com.restaurant.service;

import com.restaurant.dto.request.MonAnRequest;
import com.restaurant.dto.response.MonAnResponse;
import com.restaurant.entity.MonAn;
import com.restaurant.exception.*;
import com.restaurant.repository.MonAnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonAnService {

    private final MonAnRepository repository;

    public MonAnResponse create(MonAnRequest request) {

        MonAn mon = new MonAn();
        mon.setTenMon(request.getTenMon());
        mon.setGia(request.getGia());

        repository.save(mon);

        return MonAnResponse.builder()
                .id(mon.getId())
                .tenMon(mon.getTenMon())
                .gia(mon.getGia())
                .build();
    }

    public List<MonAnResponse> getAll() {

        return repository.findAll().stream()
                .filter(MonAn::getActive)
                .map(mon -> MonAnResponse.builder()
                        .id(mon.getId())
                        .tenMon(mon.getTenMon())
                        .gia(mon.getGia())
                        .build())
                .toList();
    }

    public void delete(Long id) {

        MonAn mon = repository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.MON_AN_NOT_FOUND));

        mon.setActive(false);
        repository.save(mon);
    }
}