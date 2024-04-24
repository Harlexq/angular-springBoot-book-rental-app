package com.bookrental.bookrental.service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    public FileStorageService() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            if (!Files.exists(this.fileStorageLocation)) {
                Files.createDirectories(this.fileStorageLocation);
            }
        } catch (IOException ex) {
            throw new RuntimeException("Yüklenen dosyaların depolanacağı dizin oluşturulamadı.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        String fileExtension = getFileExtension(file.getContentType());
        String randomFileName = UUID.randomUUID().toString() + fileExtension;

        try {
            Path targetLocation = this.fileStorageLocation.resolve(randomFileName);
            Files.copy(file.getInputStream(), targetLocation);

            return randomFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Dosya depolanamadı " + randomFileName + ". Lütfen tekrar deneyin!", ex);
        }
    }

    private String getFileExtension(String contentType) {
        if (contentType.equals("image/jpeg")) {
            return ".jpg";
        } else if (contentType.equals("image/png")) {
            return ".png";
        } else {
            throw new IllegalArgumentException("Desteklenmeyen dosya uzantısı: " + contentType);
        }
    }
    
    public void deleteFile(String fileName) {
        Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Dosya silinemedi: " + fileName, ex);
        }
    }
    
}