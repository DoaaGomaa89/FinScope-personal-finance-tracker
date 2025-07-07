package com.Finance_Tracker.demo.account;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;
	
	@PostMapping()
	public Account create(@RequestBody AccountRequest accountrequest, Principal  principle)
	{
		return accountService.addAccount(accountrequest, principle);
	}
	
	@GetMapping
	public List<Account> getAll(Principal  principle)
	{
		return accountService.getAllAccounts(principle);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<AccountResponse> toggleAccountStatus(@PathVariable Long id, Principal  principle)
	{
		AccountResponse response = accountService.toggleAccountStatus(id, principle);
		return ResponseEntity.ok(response);
		
		
	}
}
