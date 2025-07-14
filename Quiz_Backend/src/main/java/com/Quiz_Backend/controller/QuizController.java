package com.Quiz_Backend.controller;

import com.Quiz_Backend.model.Quiz;
import com.Quiz_Backend.model.Question;
import com.Quiz_Backend.repository.QuizRepository;
import com.Quiz_Backend.repository.QuestionRepository;
import com.Quiz_Backend.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin/quizzes")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        if (quizRepository.existsByTitle(quiz.getTitle())) {
            throw new ValidationException("Quiz title already exists");
        }
        return quizRepository.save(quiz);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        Quiz existingQuiz = quizRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Quiz not found"));
        existingQuiz.setTitle(quiz.getTitle());
        return ResponseEntity.ok(quizRepository.save(existingQuiz));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id) {
        if (!quizRepository.existsById(id)) {
            throw new ValidationException("Quiz not found");
        }
        quizRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{quizId}/questions")
    public List<Question> getQuestions(@PathVariable Long quizId) {
        return questionRepository.findByQuizId(quizId);
    }

    @PostMapping("/{quizId}/questions")
    public Question addQuestion(@PathVariable Long quizId, @RequestBody Question question) {
        if (!quizRepository.existsById(quizId)) {
            throw new ValidationException("Quiz not found");
        }
        question.setQuizId(quizId);
        return questionRepository.save(question);
    }

    @DeleteMapping("/{quizId}/questions/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long quizId, @PathVariable Long questionId) {
        if (!quizRepository.existsById(quizId)) {
            throw new ValidationException("Quiz not found");
        }
        if (!questionRepository.existsById(questionId)) {
            throw new ValidationException("Question not found");
        }
        questionRepository.deleteById(questionId);
        return ResponseEntity.ok().build();
    }
}