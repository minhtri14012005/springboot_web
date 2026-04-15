package com.restaurant.repository;

import com.restaurant.entity.MonAn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MonAnRepository extends JpaRepository<MonAn, Long> {
    List<MonAn> findByCategory(String category);

    List<MonAn> findByTenMonContainingIgnoreCase(String keyword);

    List<MonAn> findByCategoryAndTenMonContainingIgnoreCase(String category, String keyword);
}