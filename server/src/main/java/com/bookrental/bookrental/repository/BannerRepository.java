package com.bookrental.bookrental.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.bookrental.bookrental.model.Banners;

public interface BannerRepository extends MongoRepository<Banners, String> {
	 void deleteById(Integer id);
}
