package com.restaurant.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MonAnResponse {
    private Long id;
    private String tenMon;
    private Double gia;
}