package com.focusflow.backend.repository;

import com.focusflow.backend.domain.Memory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoryRepository extends MongoRepository<Memory, String> {

    List<Memory> findTop5ByUserIdOrderByTimestampDesc(String userId);
}
