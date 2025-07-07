package com.Finance_Tracker.demo.account;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Finance_Tracker.demo.entity.User;

public interface AccountRepository extends JpaRepository<Account, Long> {

	List<Account> findByUser(User user);
	
	@Query("SELECT SUM(a.balance) FROM Account a WHERE a.user.email = :email AND a.accountType <> 'CASH'")
	BigDecimal getTotalNonCashAccountBalance(@Param("email")String email);
	
	@Query("SELECT SUM(a.balance) FROM Account a WHERE a.user.email = :email AND a.accountType = 'CASH'")
	BigDecimal sumCashBalance(@Param("email")String email);
}
