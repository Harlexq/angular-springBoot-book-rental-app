package com.bookrental.bookrental.controller;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.bookrental.bookrental.model.WebUsers;
import com.bookrental.bookrental.repository.WebUserRepository;

@RestController
public class WebUserController {

	@Autowired
    private WebUserRepository webUserRepo;

    @GetMapping("/webUserReadAll")
    public List<WebUsers> webUserReadAll() {
        return webUserRepo.findAll();
    }

    @GetMapping("/webUserRead/{id}")
    public WebUsers webUserRead(@PathVariable Integer id) {
        return webUserRepo.findByCustomId(id);
    }

    @PostMapping("/webUserCreate")
    public WebUsers webUserCreate(@RequestBody WebUsers webUsers) {

        int sizeWebUser = webUserSize();
        webUsers.id = sizeWebUser + 1;
        webUsers.setBanned(false);
        webUsers.setRentalBooks(new ArrayList<>());

        return webUserRepo.save(webUsers);
    }

    @PutMapping("/webUserUpdate/{id}")
    public WebUsers webUserUpdate(@PathVariable Integer id, @RequestBody WebUsers webUser) {
    	WebUsers existingWebUser = webUserRepo.findByCustomId(id);

        if (existingWebUser != null) {
            existingWebUser.setFirstName(webUser.getFirstName());
            existingWebUser.setLastName(webUser.getLastName());
            existingWebUser.setAccountDate(webUser.getAccountDate());
            existingWebUser.setEmail(webUser.getEmail());
            existingWebUser.setPassword(webUser.getPassword());
            existingWebUser.setToken(webUser.getToken());
            existingWebUser.setBanned(webUser.getBanned());
            existingWebUser.setRentalBooks(webUser.getRentalBooks());

            return webUserRepo.save(existingWebUser);
        } else {
            return null;
        }
    }

    public int webUserSize() {
        return webUserRepo.findAll().size();
    }

}