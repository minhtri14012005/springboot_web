package com.restaurant.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    SUCCESS(1000, "Success"),
    MON_AN_NOT_FOUND(2001, "Không tìm thấy món ăn"),
    BAN_NOT_FOUND(2002, "Không tìm thấy bàn"),
    HOA_DON_NOT_FOUND(2003, "Không tìm thấy hóa đơn");

    private final int code;
    private final String message;
}