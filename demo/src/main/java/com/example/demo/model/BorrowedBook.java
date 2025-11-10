package com.example.demo.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "borrowed_books")
public class BorrowedBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String year;
    private String description;
    private String genre;
    private String isAvailable;
    private String status;
    private String coverImage;
    private String borrowerName;
    private String dueDate;
    private String borrowDate;
}