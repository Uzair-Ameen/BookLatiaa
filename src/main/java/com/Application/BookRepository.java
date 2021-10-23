package com.Application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<BooksTableEntity, String> {
    List<BooksTableEntity> findByBook_Genre(String genre);
    Page<BooksTableEntity> findByBook_Genre(String genre, Pageable pageable);
    List<BooksTableEntity> findByBookNameContainingIgnoreCase(String name);
    List<BooksTableEntity> findByBookGenreContainingIgnoreCase(String genre);
    List<BooksTableEntity> findByBookAutherNameContainingIgnoreCase(String auther);
    List<BooksTableEntity> findByBookPublisherContainingIgnoreCase(String publisher);
}
