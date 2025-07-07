package com.Finance_Tracker.demo.budget;


import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class BudgetController {

	private final BudgetService budgetService;
	private final UserRepository userRepository;
	
	@PostMapping("/set-budget")
	public ResponseEntity<BudgetResponseDto> setBudget(@RequestBody BudgetRequestDto dto, Principal principal){
		
		String email = principal.getName();
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
		
		return ResponseEntity.ok(budgetService.setBudget(dto, user));
	}
	
	@GetMapping("/get-all-budgets")
	public ResponseEntity<List<BudgetResponseDto>>getAllBudgets ( Principal principal){
		
		String email = principal.getName();
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
		
		return ResponseEntity.ok(budgetService.getAllBudgets(user));
	}
	
	@PutMapping("/Budget/{id}")
	public ResponseEntity<BudgetResponseDto> updateBudget(@PathVariable Long id,
	                                                      @RequestBody BudgetRequestDto updatedBudget,
	                                                      Principal principal) {

	    String email = principal.getName();
	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    BudgetResponseDto dto = budgetService.updateBudget(id, updatedBudget, user);
	    
	    return ResponseEntity.ok(dto);
	}
	
	@DeleteMapping("/budget/{id}")
	public ResponseEntity<String> deleteBudget(@PathVariable Long id, Principal principal ){
		String email = principal.getName();
		
		User user = userRepository.findByEmail(email).orElseThrow();
		budgetService.deleteBudget(id, user);
		
		return ResponseEntity.ok("Budget deleted successfully");
		
	}
}
