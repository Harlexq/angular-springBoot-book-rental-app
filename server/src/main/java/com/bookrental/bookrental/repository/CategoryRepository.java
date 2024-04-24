package com.bookrental.bookrental.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.bookrental.bookrental.model.Categories;

public interface CategoryRepository extends	MongoRepository<Categories, String> {

	 @Query("{ 'id' : ?0 }")
	 Categories findByCustomId(Integer id);
	 
	 void deleteById(Integer id);
		
}
