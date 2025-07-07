package com.Finance_Tracker.demo.account;

import java.security.Principal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

	private final AccountRepository accountRepo;
	private final UserRepository userRepo;
	
	public Account addAccount(AccountRequest accountReq, Principal principle) 
	{
		User user= userRepo.findByEmail(principle.getName()).orElseThrow();
		
		Account account = Account.builder()
				.accountName(accountReq.getAccountName())
				.bankName(accountReq.getBankName())
				.accountType(accountReq.getAccountType())
				.balance(accountReq.getBalance())
				.isActive(true)
				.user(user)
				.build();

		return accountRepo.save(account);
	}
	
	public List<Account> getAllAccounts(Principal principle)
	{
		User user= userRepo.findByEmail(principle.getName()).orElseThrow();
		return accountRepo.findByUser(user);
	}
	
	public AccountResponse  toggleAccountStatus(Long id, Principal principal) 
	{
//		Fetching account which try to toggle
	    Account account = accountRepo.findById(id).orElseThrow();

//	    Validate user who try to toggle
	    if (!account.getUser().getEmail().equals(principal.getName())) {
	        throw new RuntimeException("Unauthorized access");
	    }

//	    toggle the status
	    account.setIsActive(!account.getIsActive());
	    Account updated = accountRepo.save(account);

	    return mapToResponse(updated);
	}
	
	private AccountResponse mapToResponse(Account account) {
		return AccountResponse.builder()
				.id(account.getId())
				.bankName(account.getBankName())
				.accountName(account.getAccountName())
				.accountType(account.getAccountType())
				.balance(account.getBalance())
				.isActive(account.getIsActive())
				.build();
	}

}
