package com.focusflow.backend.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Service;

import java.time.Duration;

/**
 * Specifically protects Authentication endpoints (Login/Register) 
 * from brute-force and credential stuffing attacks.
 */
@Service
public class BruteForceProtectionService {

    // Cache per-IP buckets for 1 hour after access
    private final Cache<String, Bucket> loginAttemptCache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterAccess(Duration.ofHours(1))
            .build();

    /**
     * Limit to 5 login/register attempts per minute per IP.
     */
    public boolean isAllowed(String clientIp) {
        Bucket bucket = loginAttemptCache.get(clientIp, k -> 
            Bucket.builder()
                .addLimit(Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1))))
                .build()
        );
        return bucket.tryConsume(1);
    }
}
