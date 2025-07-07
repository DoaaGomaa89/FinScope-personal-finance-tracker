package com.Finance_Tracker.demo.transaction;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Finance_Tracker.demo.dto.BalanceDto;
import com.Finance_Tracker.demo.dto.CategorySummaryDto;
import com.Finance_Tracker.demo.dto.MonthlySummaryDto;
import com.Finance_Tracker.demo.util.CsvExport;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {

	private final TransactionService transactionservice;
	
//	-------------------------------------
	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>>addTransaction(@RequestBody TransactionRequest req, Principal principal) {
	    String email = principal.getName(); 
	    Map<String, Object> response = transactionservice.addTransaction(req, email) ;
	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateTransaction(
	        @PathVariable Long id,
	        @RequestBody TransactionRequest request,
	        Principal principal) throws AccessDeniedException {
		System.out.println("Logged-in user: " + principal.getName());

		transactionservice.updateTransaction(id, request, principal.getName());
	    return ResponseEntity.ok("Transaction updated successfully");
	}

	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTransaction(@PathVariable Long id, Principal principal) throws AccessDeniedException {
	    String email = principal.getName(); // Authenticated user's email
	    transactionservice.deleteTransaction(id, email);
	    return ResponseEntity.ok("Transaction deleted successfully");
	}

	
//-----------------------------------

	@GetMapping("/filter")
	public ResponseEntity<List<TransactionResponse>> getFIlteredTransaction(
			Principal principal,
			@RequestParam(required = false) TransactionType type,
			@RequestParam(required = false) Long bankId,
			@RequestParam(required = false) String category,
			@RequestParam(required = false) String search,
			@RequestParam(required = false) String month,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate){
		
			if(month !=null && !month.isEmpty()) {
				YearMonth ym = YearMonth.parse(month);
				startDate = ym.atDay(1);
				endDate = ym.atEndOfMonth();
			}
			
		List<TransactionResponse> transactions = transactionservice.filterTransactions(principal.getName(), type, bankId, category, search, startDate, endDate);
		
		return ResponseEntity.ok(transactions);
	}
	
//-------------------------------------------	
	@GetMapping("/balance")
	public ResponseEntity<BalanceDto> getCurrentBalance(Principal principal) {
	    BalanceDto balance = transactionservice.getBalance(principal.getName());
	    return ResponseEntity.ok(balance);
	}
//-------------------------------------------	
	@GetMapping("/summary/monthly")
	public ResponseEntity<List<MonthlySummaryDto>> getMonthlySummary(Principal principal) {
	    return ResponseEntity.ok(transactionservice.getMonthlySummary(principal.getName()));
	}

//-------------------------------------------	
	
	@GetMapping("/category-summary")
	public ResponseEntity<List<CategorySummaryDto>> getCategoryWiseSummary(Principal principal) {
	    return ResponseEntity.ok(transactionservice.getCategoryWiseSummary(principal.getName()));
	}

	@GetMapping("/recent")
	public ResponseEntity<List<TransactionResponse>> getRecentTransactions(Principal principal) {
	    List<TransactionResponse> recent = transactionservice.getRecentTransactions(principal.getName());
	    return ResponseEntity.ok(recent);
	}

//-------------------------------------------------
	@GetMapping("/export")
	public void exportTransactionsToCsv(@RequestParam(name = "type", required = false, defaultValue = "all")String type, HttpServletResponse response, Principal principal) throws IOException{
		String email = principal.getName();
		List<TransactionResponse> transactions ;
		
		if(type.equalsIgnoreCase("income") || type.equalsIgnoreCase("expense") ) {
			transactions = transactionservice.getTransactionsByType(email,type);
			
		}else {
			transactions = transactionservice.getAllTransaction(email);
		}
		
		response.setContentType("text/csv");
	    response.setHeader("Content-Disposition", "attachment; filename=transactions.csv");
	    CsvExport.writeTransactionToCsv(response.getWriter(), transactions);
	}
//-------------------------------------------------
	@GetMapping("/preview")
	public ResponseEntity<List<TransactionResponse>> getTransactionPreview(
	        Principal principal,
	        @RequestParam(name = "type", required = false, defaultValue = "all") String type) {

	    String email = principal.getName();
	    List<TransactionResponse> filtered;

	    if (type.equalsIgnoreCase("all")) {
	        filtered = transactionservice.getAllTransaction(email);
	    } else {
	        try {
	            TransactionType transactionType = TransactionType.valueOf(type.toUpperCase());
	            filtered = transactionservice.getTransactionsByTypeFroPreview(email, transactionType);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(Collections.emptyList());
	        }
	    }

	    return ResponseEntity.ok(filtered);
	}


	
	
	
//	@GetMapping("/summary/monthly")
//	public ResponseEntity<List<MonthlySummaryDto>> getMonthlySummaryDto(@RequestParam String email){
//		return ResponseEntity.ok(transactionservice.getMonthlySummary(email));
//	}
//	
//	@GetMapping("/summary/yearly")
//	public ResponseEntity<List<YearlySummaryDto>> getYearlySummary(Principal principal) {
//	    List<YearlySummaryDto> summary = transactionservice.getYearlySummary(principal.getName());
//	    return ResponseEntity.ok(summary);
//	}
}
