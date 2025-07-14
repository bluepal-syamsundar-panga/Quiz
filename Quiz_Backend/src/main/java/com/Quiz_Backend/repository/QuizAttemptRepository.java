package com.Quiz_Backend.repository;

import com.Quiz_Backend.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserId(Long userId);

    @Query("SELECT qa.quizId, u.username, MAX(qa.score) " +
           "FROM QuizAttempt qa JOIN User u ON qa.userId = u.id " +
           "GROUP BY qa.quizId, u.username")
    List<Object[]> findTopScores();
}