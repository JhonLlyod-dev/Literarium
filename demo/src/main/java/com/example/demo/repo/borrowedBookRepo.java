package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.BorrowedBook;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface borrowedBookRepo extends JpaRepository<BorrowedBook, Long> {
}
