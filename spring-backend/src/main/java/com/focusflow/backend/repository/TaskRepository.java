package com.focusflow.backend.repository;

import com.focusflow.backend.domain.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<Task> findByIdAndUserId(String id, String userId);

    long countByUserId(String userId);

    void deleteByIdAndUserId(String id, String userId);

    /**
     * Find tasks filtered by status and sorted by priority (highest first).
     */
    List<Task> findByUserIdAndStatusOrderByPriorityDesc(String userId, Task.Status status);

    /**
     * Find overdue tasks: dueDate has passed but status is NOT the excluded status.
     */
    List<Task> findByUserIdAndDueDateBeforeAndStatusNot(String userId, Instant now, Task.Status status);

    /**
     * Find tasks by category.
     */
    List<Task> findByUserIdAndCategoryOrderByPriorityDesc(String userId, String category);

    /**
     * Count completed tasks for a user.
     */
    long countByUserIdAndStatus(String userId, Task.Status status);
}
