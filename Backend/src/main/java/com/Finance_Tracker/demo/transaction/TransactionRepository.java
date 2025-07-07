package com.Finance_Tracker.demo.transaction;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Finance_Tracker.demo.dto.CategorySummaryDto;
import com.Finance_Tracker.demo.dto.MonthlySummaryDto;
import com.Finance_Tracker.demo.dto.YearlySummaryDto;
import com.Finance_Tracker.demo.entity.User;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByUserEmail(String email);

	List<Transaction> findByUserEmailAndType(String email, TransactionType type);

	List<Transaction> findByUser(User user);
	
//-----------------------------------------------------------
	@Query("SELECT t from Transaction t where t.user.email = :email " 
			+ "AND (:type IS NULL OR t.type = :type) "
			+ "AND (:bankId IS NULL OR t.account.id = :bankId) "
			+ "AND (:category IS NULL OR t.category = :category) "
			+ "AND (:search IS NULL OR LOWER(t.description ) LIKE LOWER(CONCAT('%', :search, '%'))) "
			+ "AND (:startDate IS NULL OR t.date >= :startDate) " 
			+ "AND (:endDate IS NULL OR t.date <= :endDate)")
	List<Transaction> findFilteredTransactions(@Param("email") String email, 
											@Param("type") TransactionType type,
											@Param("bankId") Long bankId, 
											@Param("category") String category, 
											@Param("search") String search,
											@Param("startDate") LocalDate startDate, 
											@Param("endDate") LocalDate endDate);

	
//-----------------------------------------------------------	
	@Query("SELECT YEAR(t.date), MONTH(t.date), SUM(t.amount), t.type " +
			       "FROM Transaction t " +
			       "WHERE t.user.email = :email " +
			       "GROUP BY YEAR(t.date), MONTH(t.date), t.type " +
			       "ORDER BY YEAR(t.date) DESC, MONTH(t.date) DESC")
	List<Object[]> getMonthlySummary(@Param("email") String email);


//-----------------------------------------------------------
	@Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.email = :email AND t.type = 'INCOME'")
	BigDecimal getTotalIncome(@Param("email") String email);
	
//-----------------------------------------------------------
	@Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.email = :email AND t.type = 'EXPENSE'")
	BigDecimal getTotalExpense(@Param("email") String email);
	
//-----------------------------------------------------------
	@Query("SELECT new com.Finance_Tracker.demo.dto.CategorySummaryDto(t.category, SUM(t.amount)) " +
		       "FROM Transaction t JOIN t.user u " +
		       "WHERE u.email = :email AND t.type = :type " +
		       "GROUP BY t.category")
	List<CategorySummaryDto> getCategorySummaryByType(@Param("email") String email,  @Param("type") TransactionType type);

//-----------------------------------------------------------
	@Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.user.id = :userId AND t.category = :category AND t.type = 'EXPENSE' AND t.date BETWEEN :start AND :end")
	Double getMonthlyExpenseForCategory(@Param("userId") Long userId, @Param("category") String category, @Param("start") LocalDate start, @Param("end") LocalDate end);

//-----------------------------------------------------------
	@Query("SELECT SUM(t.amount) FROM Transaction t " +
		       "WHERE t.user.id = :userId " +
		       "AND t.category = :category " +
		       "AND FUNCTION('DATE_FORMAT', t.date, '%Y-%m') = :month " +
		       "AND t.type = 'EXPENSE'")
		Double getUsedAmountForBudget(Long userId, String category, String month);
//-----------------------------------------------------------	
	List<Transaction> findTop5ByUserOrderByDateDesc(User user);
	List<Transaction> findByUserEmailAndTypeOrderByDateAsc(String email, TransactionType type);
}	


	
