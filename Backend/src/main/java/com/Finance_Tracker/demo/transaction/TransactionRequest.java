package com.Finance_Tracker.demo.transaction;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionRequest {
	
	private double amount;
	private String category;
	private String description ;
	private LocalDate date;
    private TransactionType type;
    private Long accountId;
}
