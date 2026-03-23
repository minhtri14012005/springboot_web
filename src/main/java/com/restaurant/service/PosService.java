package com.restaurant.service;

import com.restaurant.dto.request.GoiMonRequest;
import com.restaurant.entity.*;
import com.restaurant.exception.*;
import com.restaurant.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PosService {

    private final BanRepository banRepository;
    private final HoaDonRepository hoaDonRepository;
    private final CTHDRepository cthdRepository;
    private final MonAnRepository monAnRepository;

    public HoaDon moBan(Long banId) {

        Ban ban = banRepository.findById(banId)
                .orElseThrow(() -> new AppException(ErrorCode.BAN_NOT_FOUND));

        ban.setTrangThai(TrangThaiBan.CO_KHACH);

        HoaDon hoaDon = new HoaDon();
        hoaDon.setBan(ban);
        hoaDon.setTrangThai(TrangThaiHoaDon.CHUA_THANH_TOAN);
        hoaDon.setThoiDiemMo(LocalDateTime.now());

        banRepository.save(ban);
        return hoaDonRepository.save(hoaDon);
    }

    public void goiMon(GoiMonRequest request) {

        HoaDon hoaDon = hoaDonRepository.findById(request.getHoaDonId())
                .orElseThrow(() -> new AppException(ErrorCode.HOA_DON_NOT_FOUND));

        MonAn mon = monAnRepository.findById(request.getMonAnId())
                .orElseThrow(() -> new AppException(ErrorCode.MON_AN_NOT_FOUND));

        CTHD ct = new CTHD();
        ct.setHoaDon(hoaDon);
        ct.setMonAn(mon);
        ct.setSoLuong(request.getSoLuong());
        ct.setDonGia(mon.getGia());

        cthdRepository.save(ct);
    }

    public Double thanhToan(Long hoaDonId) {

        HoaDon hoaDon = hoaDonRepository.findById(hoaDonId)
                .orElseThrow(() -> new AppException(ErrorCode.HOA_DON_NOT_FOUND));

        List<CTHD> ds = cthdRepository.findByHoaDon(hoaDon);

        double tong = ds.stream()
                .mapToDouble(ct -> ct.getSoLuong() * ct.getDonGia())
                .sum();

        hoaDon.setTongTien(tong);
        hoaDon.setTrangThai(TrangThaiHoaDon.DA_THANH_TOAN);
        hoaDon.setThoiDiemThanhToan(LocalDateTime.now());

        Ban ban = hoaDon.getBan();
        ban.setTrangThai(TrangThaiBan.TRONG);

        banRepository.save(ban);
        hoaDonRepository.save(hoaDon);

        return tong;
    }
    public void capNhatSoLuong(Long cthdId, Integer soLuong) {

        CTHD cthd = cthdRepository.findById(cthdId)
                .orElseThrow(() -> new AppException(ErrorCode.HOA_DON_NOT_FOUND));

        if (soLuong <= 0) {
            throw new RuntimeException("Số lượng phải lớn hơn 0");
        }

        cthd.setSoLuong(soLuong);
        cthdRepository.save(cthd);
    }
    public void xoaMonKhoiHoaDon(Long cthdId) {

        CTHD cthd = cthdRepository.findById(cthdId)
                .orElseThrow(() -> new AppException(ErrorCode.HOA_DON_NOT_FOUND));

        cthdRepository.delete(cthd);
    }
}