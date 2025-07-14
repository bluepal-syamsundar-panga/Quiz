package com.Quiz_Backend.repository;

import com.Quiz_Backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    boolean existsByTitle(String title);
}