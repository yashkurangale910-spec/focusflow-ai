package com.focusflow.backend.repository;

import com.focusflow.backend.domain.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface SessionRepository extends MongoRepository<Session, String> {

    List<Session> findByUserIdOrderByCreatedAtDesc(String userId);

    long countByUserId(String userId);

    List<Session> findByCreatedAtAfter(Instant date);
}
