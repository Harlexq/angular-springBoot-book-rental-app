package com.bookrental.bookrental.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.bookrental.bookrental.model.Blogs;
import com.bookrental.bookrental.repository.BlogRepository;
import com.bookrental.bookrental.service.FileStorageService;

@RestController
public class BlogController {

    @Autowired
    private BlogRepository blogRepo;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/blogReadAll")
    public List<Blogs> blogReadAll() {
        return blogRepo.findAll();
    }

    @GetMapping("/blogRead/{id}")
    public Blogs blogRead(@PathVariable Integer id) {
        return blogRepo.findByCustomId(id);
    }

    @PostMapping("/blogCreate")
    public Blogs blogCreate(@RequestParam(name = "image", required = false) MultipartFile image,
            @RequestParam("title") String title, @RequestParam("description") String description,
            @RequestParam("publishDate") String publishDate) {

        int sizeBlog = blogSize();
        Blogs blog = new Blogs();
        blog.id = sizeBlog + 1;
        blog.setTitle(title);
        blog.setDescription(description);
        blog.setPublishDate(publishDate);

        if (image != null) {
            String fileName = fileStorageService.storeFile(image);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/")
                    .path(fileName)
                    .toUriString();

            blog.setImage(fileDownloadUri);
        } else {
            blog.setImage(null);
        }

        return blogRepo.save(blog);
    }

    @PutMapping("/blogUpdate/{id}")
    public Blogs blogUpdate(@PathVariable Integer id,
            @RequestParam(name = "image", required = false) MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("publishDate") String publishDate) {
        Blogs existingBlog = blogRepo.findByCustomId(id);

        if (existingBlog != null) {
            existingBlog.setTitle(title);
            existingBlog.setDescription(description);
            existingBlog.setPublishDate(publishDate);

            if (image != null) {
                String fileName = fileStorageService.storeFile(image);
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/")
                        .path(fileName)
                        .toUriString();

                existingBlog.setImage(fileDownloadUri);
            }

            return blogRepo.save(existingBlog);
        } else {
            return null;
        }
    }

    @DeleteMapping("/blogDelete/{id}")
    public void blogDelete(@PathVariable Integer id) {
        Blogs blogToDelete = blogRepo.findByCustomId(id);
        if (blogToDelete != null) {
            String imageFileName = blogToDelete.getImage();
            if (imageFileName != null) {
                fileStorageService.deleteFile(imageFileName.substring(imageFileName.lastIndexOf("/") + 1));
            }
            blogRepo.deleteById(id);
        } else {
            throw new RuntimeException("Silinecek blog bulunamadı: " + id);
        }
    }

    public int blogSize() {
        return blogRepo.findAll().size();
    }

}