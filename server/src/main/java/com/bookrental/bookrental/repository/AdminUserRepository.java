package com.bookrental.bookrental.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.bookrental.bookrental.model.AdminUsers;

public interface AdminUserRepository extends MongoRepository<AdminUsers, String> {
	
}
