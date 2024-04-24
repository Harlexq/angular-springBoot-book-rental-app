package com.bookrental.bookrental.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.bookrental.bookrental.model.Banners;
import com.bookrental.bookrental.repository.BannerRepository;
import com.bookrental.bookrental.service.FileStorageService;

@RestController
public class BannerController {
	
	@Autowired
	private BannerRepository bannerRepo;
    
    @Autowired
    private FileStorageService fileStorageService;
	
	@GetMapping("/bannerReadAll")
	public List<Banners> bannerReadAll() {
		return bannerRepo.findAll();
    }
	
	@PostMapping("/bannerCreate")
	public Banners bannerCreate(@RequestParam("image") MultipartFile image) {
		
		int sizeBanner = bannerSize();
		Banners banner = new Banners();
		banner.id = sizeBanner + 1;
		
		String fileName = fileStorageService.storeFile(image);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/")
                .path(fileName)
                .toUriString();

        banner.setImage(fileDownloadUri);
		
		return bannerRepo.save(banner);
	}
	
	@DeleteMapping("/bannerDelete/{id}")
	public void bannerDelete(@PathVariable Integer id) {
		bannerRepo.deleteById(id);
	}
	
	public int bannerSize() {
		return bannerRepo.findAll().size();
	}
	
}