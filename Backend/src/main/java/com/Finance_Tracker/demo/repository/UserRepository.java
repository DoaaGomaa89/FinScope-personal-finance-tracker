package com.Finance_Tracker.demo.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Finance_Tracker.demo.entity.Role;
import com.Finance_Tracker.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository <User,Long>
{
	Optional<User> findByEmail(String email);
	boolean existsByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE " +
	"(:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
	"(:active IS NULL OR u.active = :active)")
	List<User> findFilterUsers(@Param("email")String email,
								@Param("active") Boolean active);
	
	long countByActive(boolean active);
	
	long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
	
	long countByRolesContaining(Role role);

}
