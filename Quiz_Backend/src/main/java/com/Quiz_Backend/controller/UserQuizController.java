package com.Quiz_Backend.controller;

import com.Quiz_Backend.model.Question;
import com.Quiz_Backend.model.QuizAttempt;
import com.Quiz_Backend.repository.QuestionRepository;
import com.Quiz_Backend.repository.QuizAttemptRepository;
import com.Quiz_Backend.repository.UserRepository;
import com.Quiz_Backend.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/user")
public class UserQuizController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/quizzes/{quizId}/submit")
    public ResponseEntity<?> submitQuiz(@PathVariable Long quizId, @RequestBody Map<Long, Integer> answers) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Question> questions = questionRepository.findByQuizId(quizId);
        if (questions.isEmpty()) {
            throw new ValidationException("No questions found for this quiz");
        }
        int score = 0;
        for (Question q : questions) {
            Integer answer = answers.get(q.getId());
            if (answer != null && answer == q.getCorrectAnswer()) {
                score++;
            }
        }
        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(userRepository.findByUsername(username).getId());
        attempt.setQuizId(quizId);
        attempt.setScore(score);
        quizAttemptRepository.save(attempt);
        return ResponseEntity.ok(Map.of("score", score, "total", questions.size()));
    }

    @GetMapping("/attempts")
    public List<QuizAttempt> getUserAttempts() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return quizAttemptRepository.findByUserId(userRepository.findByUsername(username).getId());
    }
}