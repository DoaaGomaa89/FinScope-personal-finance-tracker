package com.Finance_Tracker.demo.budget;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BudgetResponseDto {

    private Long id;
    private Long userId;
    private String category;
    private String month;
    private Double limitAmount;
    private Double usedAmount;
}
