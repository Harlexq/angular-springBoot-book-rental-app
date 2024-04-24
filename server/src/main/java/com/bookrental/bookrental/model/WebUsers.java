package com.bookrental.bookrental.model;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document
public class WebUsers {
	@Id
	public ObjectId _id;
	public Integer id;
	public String firstName;
	public String lastName;
	public String accountDate;
	public String email;
	public String password;
	public String token;
	public Boolean banned;
	public List<RentalBooks> rentalBooks;
	
	public List<RentalBooks> getRentalBooks() {
        return rentalBooks;
    }

    public void setRentalBooks(List<RentalBooks> rentalBooks) {
        this.rentalBooks = rentalBooks;
    }
	
	public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAccountDate() {
        return accountDate;
    }

    public void setAccountDate(String accountDate) {
        this.accountDate = accountDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
    public Boolean getBanned() {
        return banned;
    }

    public void setBanned(Boolean banned) {
        this.banned = banned;
    }
    
    public static class RentalBooks {
    	public Integer bookId;
    	public String rentDate;
    }
}
