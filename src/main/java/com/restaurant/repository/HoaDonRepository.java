package com.restaurant.repository;

import com.restaurant.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {

    Optional<HoaDon> findByBanAndTrangThai(Ban ban, TrangThaiHoaDon trangThai);

    List<HoaDon> findByTrangThai(TrangThaiHoaDon trangThai);
}