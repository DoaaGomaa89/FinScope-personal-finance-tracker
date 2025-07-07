package com.Finance_Tracker.demo.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponse {

    private Long id;
    private String bankName;
    private String accountName;
    private AccountType accountType;
    private Double balance;
    private Boolean isActive;
}
