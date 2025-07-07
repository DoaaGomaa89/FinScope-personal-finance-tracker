package com.Finance_Tracker.demo.budget;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

	Optional<Budget> findByUserIdAndCategoryAndMonth(Long userId, String category, String month);
	List<Budget> findByUserId(Long userId);
	Optional<Budget> findByUserIdAndCategory(Long userId, String category);
}

