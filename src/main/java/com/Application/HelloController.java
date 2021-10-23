package com.Application;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {

    private final BookRepository bookRepository;
    private final AutherRepository autherRepository;

    public HelloController(BookRepository bookRepository, AutherRepository autherRepository) {
        this.bookRepository = bookRepository;
        this.autherRepository = autherRepository;
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @PostMapping("/api/add")
    public @ResponseBody BooksTableEntity add(@RequestBody Book b) {
        BooksTableEntity book = new BooksTableEntity();
        book.setBook(b);
        AutherEntity auther = autherRepository.findByName(book.getBook().getAuther().getName());
        if (auther != null) book.getBook().setAuther(auther);
        BooksTableEntity save = bookRepository.save(book);
        System.out.println("Saving.....\n" + save);
        return save;
    }

    @PutMapping("/api/update")
    public @ResponseBody BooksTableEntity update(@RequestBody BooksTableEntity book) {
        AutherEntity auther = autherRepository.findByName(book.getBook().getAuther().getName());
        if (auther != null) book.getBook().setAuther(auther);
        BooksTableEntity save = bookRepository.save(book);
        System.out.println("updating....\n" + save);
        return save;
    }

    @DeleteMapping("/api/delete/{id}")
    public @ResponseBody String remove(@PathVariable String id) {
        bookRepository.deleteById(id);
        boolean isDeleted = getResourceFile("book-covers" + File.separator + id + ".jpg").delete();
        if (!isDeleted) System.out.println("File Not Deleted");
        return "Deleted";
    }

    @GetMapping("/api/books")
    public @ResponseBody Iterable<BooksTableEntity> getAll() {
        return bookRepository.findAll();
    }

    @GetMapping("/api/book/{id}")
    public @ResponseBody Book getBook(@PathVariable String id) {
        Optional<BooksTableEntity> byId = bookRepository.findById(id);
        return byId.map(BooksTableEntity::getBook).orElse(null);
    }

    @GetMapping(value = "/api/books/covers/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getImage(@PathVariable String id) {
        try {
            File imageFile = getResourceFile("book-covers" + File.separator + id + ".jpg");
            return Files.readAllBytes(imageFile.toPath());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private File getResourceFile(String subPath) {
        ClassLoader classLoader = getClass().getClassLoader();
        return new File(classLoader.getResource(".").getFile() + File.separator + subPath);
    }

    @PostMapping(value="/api/upload/cover/{id}")
    public @ResponseBody String uploadCover(@RequestParam MultipartFile file, @PathVariable String id) {
        try {
            BufferedImage cover = ImageIO.read(file.getInputStream());
            File coverFile = getResourceFile("book-covers" + File.separator + id + ".jpg");
            ImageIO.write(cover, "jpg", coverFile);
            System.out.println("File saved At" + coverFile.getAbsolutePath());
            return "success";
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(value = "/api/books/{page}/{number}")
    public @ResponseBody
    List<BooksTableEntity> getPage(@PathVariable int page, @PathVariable int number) {
        return bookRepository.findAll(PageRequest.of(page - 1, number)).getContent();
    }

    @GetMapping(value = "/api/books/allBooks")
    public @ResponseBody int getAllBooks() {
        return bookRepository.findAll().size();
    }

    @GetMapping(value = "/api/books/{genre}/{page}/{number}")
    public @ResponseBody
    List<BooksTableEntity> getByGenre(@PathVariable String genre, @PathVariable int page, @PathVariable int number) {
        return bookRepository.findByBook_Genre(genre, PageRequest.of(page - 1, number)).getContent();
    }

    @GetMapping(value = "/api/books/genres")
    public @ResponseBody
    List<String> getGenres() {
        return bookRepository.findAll().stream().map(booksTableEntity -> booksTableEntity.getBook().getGenre()).distinct()
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/api/books/search/{keyword}")
    public @ResponseBody List<BooksTableEntity> search(@PathVariable String keyword) {
        Stream<BooksTableEntity> stream = Stream.of();
        stream = Stream.concat(stream, bookRepository.findByBookNameContainingIgnoreCase(keyword).stream());
        stream = Stream.concat(stream, bookRepository.findByBookGenreContainingIgnoreCase(keyword).stream());
        stream = Stream.concat(stream, bookRepository.findByBookAutherNameContainingIgnoreCase(keyword).stream());
        stream = Stream.concat(stream, bookRepository.findByBookPublisherContainingIgnoreCase(keyword).stream());
        return stream.collect(Collectors.toList());
    }
}
