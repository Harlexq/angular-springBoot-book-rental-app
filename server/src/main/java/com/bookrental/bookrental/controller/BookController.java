package com.bookrental.bookrental.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.bookrental.bookrental.model.Books;
import com.bookrental.bookrental.repository.BookRepository;
import com.bookrental.bookrental.service.FileStorageService;

@RestController
public class BookController {

    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/bookReadAll")
    public List<Books> bookReadAll(@RequestParam(required = false) Integer categoryId) {
        if (categoryId != null) {
            return bookRepo.findByCategoryId(categoryId);
        } else {
            return bookRepo.findAll();
        }
    }

    @GetMapping("/bookRead/{id}")
    public Books bookRead(@PathVariable Integer id) {
        return bookRepo.findById(id).orElseThrow();
    }

    @PostMapping("/bookCreate")
    public Books bookCreate(@RequestParam(name = "image", required = false) MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("publisher") String publisher,
            @RequestParam("author") String author,
            @RequestParam("price") Integer price,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("publishDate") String publishDate,
            @RequestParam("pageNumber") Integer pageNumber) {
        int sizeBook = bookSize();
        Books book = new Books();
        book.id = sizeBook + 1;
        book.setTitle(title);
        book.setDescription(description);
        book.setPublisher(publisher);
        book.setAuthor(author);
        book.setPrice(price);
        book.setCategoryId(categoryId);
        book.setPublishDate(publishDate);
        book.setPageNumber(pageNumber);
        book.setIsRented(false);
        book.setRentedFrom(-1);

        if (image != null) {
            String fileName = fileStorageService.storeFile(image);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/")
                    .path(fileName)
                    .toUriString();

            book.setImage(fileDownloadUri);
        }

        return bookRepo.save(book);
    }

    @PutMapping("/bookUpdate/{id}")
    public Books bookUpdate(@PathVariable Integer id,
            @RequestParam(name = "image", required = false) MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("publisher") String publisher,
            @RequestParam("author") String author,
            @RequestParam("price") Integer price,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("publishDate") String publishDate,
            @RequestParam("pageNumber") Integer pageNumber) {

        Books existingBook = bookRepo.findById(id).orElseThrow();
        existingBook.setTitle(title);
        existingBook.setDescription(description);
        existingBook.setPublisher(publisher);
        existingBook.setAuthor(author);
        existingBook.setPrice(price);
        existingBook.setCategoryId(categoryId);
        existingBook.setPublishDate(publishDate);
        existingBook.setPageNumber(pageNumber);

        if (image != null) {
            String fileName = fileStorageService.storeFile(image);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/")
                    .path(fileName)
                    .toUriString();

            existingBook.setImage(fileDownloadUri);
        }

        return bookRepo.save(existingBook);
    }
    
    @PutMapping("/bookUpdate/rent")
    public Books bookUpdate(@RequestBody Books book){

        var existingBook = bookRepo.findById(book.id).orElseThrow();
        
        existingBook.setIsRented(book.isRented);
        existingBook.setRentedFrom(book.rentedFrom);
        return bookRepo.save(existingBook);
    }

    @DeleteMapping("/bookDelete/{id}")
    public void bookDelete(@PathVariable Integer id) {
        Books bookToDelete = bookRepo.findById(id).orElseThrow();
        if (bookToDelete != null) {
            String imageFileName = bookToDelete.getImage();
            if (imageFileName != null) {
                fileStorageService.deleteFile(imageFileName.substring(imageFileName.lastIndexOf("/") + 1));
            }
            bookRepo.deleteById(id);
        } else {
            throw new RuntimeException("Silinecek kitap bulunamadı: " + id);
        }
    }

    public int bookSize() {
        return bookRepo.findAll().size();
    }

}