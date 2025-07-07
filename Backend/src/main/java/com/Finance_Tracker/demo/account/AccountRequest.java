package com.Finance_Tracker.demo.account;

import lombok.Data;

@Data
public class AccountRequest 
{
	private String bankName;
	private String accountName;
	private AccountType accountType;
	private Double balance;
}
