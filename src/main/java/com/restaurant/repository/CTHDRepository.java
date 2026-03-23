package com.restaurant.repository;

import com.restaurant.entity.CTHD;
import com.restaurant.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CTHDRepository extends JpaRepository<CTHD, Long> {
    List<CTHD> findByHoaDon(HoaDon hoaDon);
}