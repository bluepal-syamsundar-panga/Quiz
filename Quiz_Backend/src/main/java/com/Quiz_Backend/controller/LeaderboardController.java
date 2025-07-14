package com.Quiz_Backend.controller;

import com.Quiz_Backend.repository.QuizAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @GetMapping
    public ResponseEntity<List<Object[]>> getLeaderboard() {
        return ResponseEntity.ok(quizAttemptRepository.findTopScores());
    }
}