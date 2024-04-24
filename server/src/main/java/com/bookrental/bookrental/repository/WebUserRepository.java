package com.bookrental.bookrental.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.bookrental.bookrental.model.WebUsers;

public interface WebUserRepository extends	MongoRepository<WebUsers, String> {
	@Query("{ 'id' : ?0 }")
	WebUsers findByCustomId(Integer id);
}
