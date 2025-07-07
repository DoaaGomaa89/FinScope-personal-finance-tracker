package com.Finance_Tracker.demo.account;

import com.Finance_Tracker.demo.entity.User;

import jakarta.persistence.Column;
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
@Table(name="accounts")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

public class Account {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String bankName;
	private String accountName;
	
	@Enumerated(EnumType.STRING)
	private AccountType accountType;
	
	private Double balance;
	
	@Column(nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean isActive = true;


	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	
}
