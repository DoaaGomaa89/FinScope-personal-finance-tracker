package com.Finance_Tracker.demo.dto;

public class CategorySummaryDto {
    private String category;
    private Double totalAmount;

    public CategorySummaryDto(String category, Double totalAmount) {
        this.category = category;
        this.totalAmount = totalAmount;
    }

    // Getters and setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
