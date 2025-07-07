package com.Finance_Tracker.demo.dto;

public class YearlySummaryDto {

    private int year;
    private double totalIncome;
    private double totalExpense;

    // Constructor to match the query results
    public YearlySummaryDto(int year, double totalIncome, double totalExpense) {
        this.year = year;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
    }

    // Getters and setters
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(double totalExpense) {
        this.totalExpense = totalExpense;
    }
}