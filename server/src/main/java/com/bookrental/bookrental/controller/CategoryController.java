package com.bookrental.bookrental.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.bookrental.bookrental.model.Categories;
import com.bookrental.bookrental.repository.CategoryRepository;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepo;

    @GetMapping("/categoryReadAll")
    public List<Categories> categoryReadAll() {
        return categoryRepo.findAll();
    }

    @GetMapping("/categoryRead/{id}")
    public Categories categoryRead(@PathVariable Integer id) {
        return categoryRepo.findByCustomId(id);
    }

    @PostMapping("/categoryCreate")
    public Categories categoryCreate(@RequestBody Categories categories) {

        int sizeCategory = categorySize();
        categories.id = sizeCategory + 1;

        return categoryRepo.save(categories);
    }

    @PutMapping("/categoryUpdate/{id}")
    public Categories categoryUpdate(@PathVariable Integer id, @RequestBody Categories categories) {
        Categories existingCategory = categoryRepo.findByCustomId(id);

        if (existingCategory != null) {
            existingCategory.setTitle(categories.getTitle());
            existingCategory.setDescription(categories.getDescription());

            return categoryRepo.save(existingCategory);
        } else {
            return null;
        }
    }

    @DeleteMapping("/categoryDelete/{id}")
    public void categoryDelete(@PathVariable Integer id) {
        categoryRepo.deleteById(id);
    }

    public int categorySize() {
        return categoryRepo.findAll().size();
    }

}