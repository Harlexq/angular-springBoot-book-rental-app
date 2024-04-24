package com.bookrental.bookrental.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.bookrental.bookrental.model.Books;

public interface BookRepository extends	MongoRepository<Books, String> {

	 Optional<Books> findById(Integer id);
	 
	 List<Books> findByCategoryId(Integer categoryId);
	 
	 void deleteById(Integer id);
		
}
