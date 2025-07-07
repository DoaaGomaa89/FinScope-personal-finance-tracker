package com.Finance_Tracker.demo.dto;

import java.time.Month;
import java.time.YearMonth;

import com.Finance_Tracker.demo.transaction.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlySummaryDto {
    private YearMonth month;
    private double totalAmount;
    private TransactionType type;
}
