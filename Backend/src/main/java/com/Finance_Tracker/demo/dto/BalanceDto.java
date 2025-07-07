package com.Finance_Tracker.demo.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BalanceDto 
{
	private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal onlineBalance;
    private BigDecimal cashBalance;
}
