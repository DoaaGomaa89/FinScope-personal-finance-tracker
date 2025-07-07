package com.Finance_Tracker.demo.transaction;

import java.math.BigDecimal;
import java.nio.file.AccessDeniedException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Finance_Tracker.demo.account.Account;
import com.Finance_Tracker.demo.account.AccountRepository;
import com.Finance_Tracker.demo.budget.Budget;
import com.Finance_Tracker.demo.budget.BudgetRepository;
import com.Finance_Tracker.demo.dto.BalanceDto;
import com.Finance_Tracker.demo.dto.CategorySummaryDto;
import com.Finance_Tracker.demo.dto.MonthlySummaryDto;
import com.Finance_Tracker.demo.entity.User;
import com.Finance_Tracker.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {

	private final TransactionRepository transactionRepo;
	private final UserRepository userRepo;
	private final AccountRepository accountRepo;
	private final BudgetRepository budgetRepo;
	
	public Map<String, Object> addTransaction(TransactionRequest req, String email) {

	    User user = userRepo.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Account acc = accountRepo.findById(req.getAccountId())
	            .orElseThrow(() -> new RuntimeException("Account not found"));

	    Transaction transaction = new Transaction();
	    transaction.setAmount(req.getAmount());
	    transaction.setCategory(req.getCategory());
	    transaction.setDescription(req.getDescription());
	    transaction.setDate(req.getDate());
	    transaction.setUser(user);
	    transaction.setAccount(acc);
	    transaction.setType(req.getType());

	    // ✅ Check for budget exceed (only for EXPENSE)
	    boolean budgetExceeded = false;

	    if (req.getType() == TransactionType.EXPENSE) {
	        acc.setBalance(acc.getBalance() - req.getAmount());

	        // Check if user has a budget set for this category
	        String month = YearMonth.from(req.getDate()).toString();
	        Optional<Budget> optionalBudget = budgetRepo.findByUserIdAndCategoryAndMonth(user.getId(), req.getCategory(), month);
	        System.out.println("Optional is: "+optionalBudget);
	        
	        if (optionalBudget.isPresent()) {
	        	
	            LocalDate start = YearMonth.parse(month).atDay(1);
	            LocalDate end = YearMonth.parse(month).atEndOfMonth();
	            
	            System.out.println("Start date: "+ start+ "end date: "+ end);
	            
	            double totalThisMonth = transactionRepo.getMonthlyExpenseForCategory(user.getId(), req.getCategory(), start, end);
	            System.out.println("This Month: "+totalThisMonth);
	            
	            double totalWithNew = totalThisMonth + req.getAmount();
	            System.out.println(totalWithNew);
	            
	            if (totalWithNew > optionalBudget.get().getLimitAmount()) {
	                budgetExceeded = true;
	            }
	        }

	    } else if (req.getType() == TransactionType.INCOME) {
	        acc.setBalance(acc.getBalance() + req.getAmount());
	    }

	    transactionRepo.save(transaction);
	    accountRepo.save(acc);

	    Map<String, Object> response  = new HashMap<>();
	    response.put("success", true);
	    response.put("budgetExceeded",budgetExceeded );
	    response.put("message", budgetExceeded 
	    		? "Transaction added, but budget exceeded!"
	    				:"Transaction added sucessfully!");
	    
	    return response;
	}

	
public void updateTransaction(Long id, TransactionRequest request, String email) throws AccessDeniedException 
{
		Transaction existing = transactionRepo.findById(id).orElseThrow();
          
	    System.out.println("Logged in user: " + email);
	    System.out.println("Transaction owner: " + existing.getUser().getEmail());
//		
//        if (!existing.getUser().getEmail().equals(email)) {
//            throw new AccessDeniedException("You are not allowed to update this transaction.");
//        }

     
        existing.setAmount(request.getAmount());
        existing.setCategory(request.getCategory());
        existing.setDescription(request.getDescription());
        existing.setDate(request.getDate());

     
        if (!existing.getAccount().getId().equals(request.getAccountId())) {
            Account account = accountRepo.findById(request.getAccountId())
                    .orElseThrow();
            existing.setAccount(account);
        }

        
        existing.setType(request.getType());

        transactionRepo.save(existing);
}
public void deleteTransaction(long id, String email) throws AccessDeniedException {
	Transaction transaction = transactionRepo.findById(id).orElseThrow();
	if(!transaction.getUser().getEmail().equals(email)) throw new AccessDeniedException("Not allowed");
	transactionRepo.deleteById(id);
}
	
public List<TransactionResponse> filterTransactions(String email,TransactionType type, Long bankId, String category, String search,LocalDate startDate, LocalDate endDate) 
{
	System.out.println("Filtering between: " + startDate + " and " + endDate);
    
	return transactionRepo.findFilteredTransactions
        		(email,type,bankId,category,search,startDate,endDate)
        		 .stream()
                 .map(this::mapToResponse)
                 .collect(Collectors.toList());
        
}
    
private TransactionResponse mapToResponse(Transaction t) {
    return new TransactionResponse(
    		
        t.getId(),
        t.getAmount(),
        t.getCategory(),
        t.getDescription(),
        t.getDate(),
        t.getType(),
        t.getAccount().getBankName(),
        t.getAccount().getId()
    );
}
    
    
public List<TransactionResponse> getRecentTransactions(String email) 
{
        User user = userRepo.findByEmail(email).orElseThrow();
        List<Transaction> transactions = transactionRepo
            .findTop5ByUserOrderByDateDesc(user);
        return transactions.stream().map(this::mapToResponse).toList();
}

public List<MonthlySummaryDto> getMonthlySummary(String email) {
    List<Object[]> results = transactionRepo.getMonthlySummary(email);
    List<MonthlySummaryDto> summaryList = new ArrayList<>();

    for (Object[] row : results) {
        int year = (int) row[0];
        int month = (int) row[1];
        double totalAmount = (double) row[2];
        TransactionType type = (TransactionType) row[3];

        summaryList.add(new MonthlySummaryDto(YearMonth.of(year, month), totalAmount, type));
    }
    return summaryList;
}

   
public BalanceDto getBalance(String email) {

		
        BigDecimal totalIncome = transactionRepo.getTotalIncome(email);
        BigDecimal totalExpense = transactionRepo.getTotalExpense(email);
        BigDecimal onlineBalance = accountRepo.getTotalNonCashAccountBalance(email);
        BigDecimal cashBalance = accountRepo.sumCashBalance(email);

        if (totalIncome == null) totalIncome = BigDecimal.ZERO;
        if (totalExpense == null) totalExpense = BigDecimal.ZERO;
        if (onlineBalance == null) onlineBalance = BigDecimal.ZERO;
        if (cashBalance == null) cashBalance = BigDecimal.ZERO;
        

        return new BalanceDto(totalIncome, totalExpense, onlineBalance, cashBalance);
}

public List<CategorySummaryDto> getCategoryWiseSummary(String email) 
{
    return transactionRepo.getCategorySummaryByType(email, TransactionType.EXPENSE);
}


    public List<TransactionResponse> getAllTransaction(String email){
    	User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    	List<Transaction> transactions = transactionRepo.findByUser(user);
    	return transactions.stream().map(this::mapToResponse).toList();
}
    public List<TransactionResponse> getTransactionsByType(String email, String type){
    	TransactionType transactionType;
        try {
            transactionType = TransactionType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid transaction type: " + type);
        }

        List<Transaction> transactions = transactionRepo.findByUserEmailAndTypeOrderByDateAsc(email, transactionType);
        return transactions.stream().map(this::mapToResponse).toList();
    }
    
    public List<TransactionResponse> getTransactionsByTypeFroPreview(String email, TransactionType type){
    	List<Transaction> transactions = transactionRepo.findByUserEmailAndType(email, type);
        return transactions.stream().map(this::mapToResponse).toList();
    
    }

//public List<Transaction> getTransactionsByType(String email,TransactionType type){
//	return transactionRepo.findByUserEmailAndType(email, type);
//}
    



}
