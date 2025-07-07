package com.Finance_Tracker.demo.budget;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BudgetRequestDto {

	private Long userId;
	private String category;
	private String month;
	private Double limitAmount;
	
	
}
