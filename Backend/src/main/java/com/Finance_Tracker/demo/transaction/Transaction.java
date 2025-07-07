package com.Finance_Tracker.demo.transaction;

import java.time.LocalDate;

import com.Finance_Tracker.demo.account.Account;
import com.Finance_Tracker.demo.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private double amount;
	private String category;
	private String description ;
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	private TransactionType type;
	
	@ManyToOne
	@JoinColumn(name="bank_account_id")
	private Account account;
	
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	
}
