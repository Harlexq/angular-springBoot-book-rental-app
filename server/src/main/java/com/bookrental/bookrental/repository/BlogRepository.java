package com.bookrental.bookrental.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.bookrental.bookrental.model.Blogs;

public interface BlogRepository extends	MongoRepository<Blogs, String> {

	 @Query("{ 'id' : ?0 }")
	 Blogs findByCustomId(Integer id);
	 
	 void deleteById(Integer id);
		
}
