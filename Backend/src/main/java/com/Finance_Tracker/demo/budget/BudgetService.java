package com.Finance_Tracker.demo.budget;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Finance_Tracker.demo.account.AccountRepository;
import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;
import com.Finance_Tracker.demo.transaction.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BudgetService {
	private final BudgetRepository budgetRepository;
	
	private final UserRepository userRepo;
	private final TransactionRepository transactionRepo;
	
public BudgetResponseDto setBudget(BudgetRequestDto dto, User user) {
		
		String month = dto.getMonth();
		
	    Optional<Budget> existing = budgetRepository.findByUserIdAndCategoryAndMonth(
                user.getId(), dto.getCategory(), month
        );
	    
	    Budget budget = existing.orElse(new Budget());
	    

	    budget.setUser(user);
	    budget.setCategory(dto.getCategory());
	    budget.setMonth(month);
	    budget.setLimitAmount(dto.getLimitAmount());
	    
	    Budget saved = budgetRepository.save(budget);
	    
	    return BudgetResponseDto.builder()
                .id(saved.getId())
                .userId(user.getId())
                .category(saved.getCategory())
                .month(saved.getMonth())
                .limitAmount(saved.getLimitAmount())
                .usedAmount(0.0)
                .build();
}
	
public List<BudgetResponseDto> getAllBudgets(User user) {
	
		List<Budget> budgets = budgetRepository.findByUserId(user.getId());
		
		return budgets.stream().map(budget -> {
            Double used = transactionRepo.getUsedAmountForBudget(
                    user.getId(),
                    budget.getCategory(),
                    budget.getMonth()
            );

            return BudgetResponseDto.builder()
                    .id(budget.getId())
                    .userId(user.getId())
                    .category(budget.getCategory())
                    .month(budget.getMonth())
                    .limitAmount(budget.getLimitAmount())
                    .usedAmount(used != null ? used : 0.0)
                    .build();
        }).toList();
	}


public BudgetResponseDto updateBudget(Long id, BudgetRequestDto updatedBudget, User user) {
	
	Budget existingBudget = budgetRepository.findById(id).orElseThrow();
	
	
	existingBudget.setCategory(updatedBudget.getCategory());
	existingBudget.setMonth(updatedBudget.getMonth());
	existingBudget.setLimitAmount(updatedBudget.getLimitAmount());
	
	Budget updated = budgetRepository.save(existingBudget);
	
	 Double used = transactionRepo.getUsedAmountForBudget(
             user.getId(), updated.getCategory(), updated.getMonth());

     return BudgetResponseDto.builder()
             .id(updated.getId())
             .userId(user.getId())
             .category(updated.getCategory())
             .month(updated.getMonth())
             .limitAmount(updated.getLimitAmount())
             .usedAmount(used != null ? used : 0.0)
             .build();
}

public void deleteBudget(Long id, User user) {
	Budget budget = budgetRepository.findById(id).orElseThrow(() -> new RuntimeException("Budget not found"));
	
	if (!budget.getUser().getEmail().equals(user.getEmail())) {
       throw new RuntimeException("Unauthorized to delete this budget.");
   }
	
	budgetRepository.delete(budget);
}


}

