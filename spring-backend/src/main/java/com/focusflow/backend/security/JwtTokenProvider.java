package com.focusflow.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;

/**
 * Generates and validates JWT tokens.
 * Token payload matches Node backend: sub (userId), email, role, iat, exp
 */
@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    private Key signingKey;

    @PostConstruct
    public void init() {
        // Use the secret directly — pad to at least 256 bits for HS256
        byte[] keyBytes = jwtSecret.getBytes();
        if (keyBytes.length < 32) {
            // Pad short secrets to 32 bytes
            byte[] padded = new byte[32];
            System.arraycopy(keyBytes, 0, padded, 0, keyBytes.length);
            keyBytes = padded;
        }
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generate a JWT token with the same claims the Node backend uses:
     *   { userId (as sub), email, role, iat, exp }
     */
    public String generateToken(String userId, String email, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(userId)
                .claim("userId", userId)   // Node backend puts userId in payload
                .claim("email", email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract the userId (subject) from a valid token.
     */
    public String getUserIdFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    /**
     * Extract email from token.
     */
    public String getEmailFromToken(String token) {
        return parseClaims(token).get("email", String.class);
    }

    /**
     * Extract role from token.
     */
    public String getRoleFromToken(String token) {
        return parseClaims(token).get("role", String.class);
    }

    /**
     * Validate a token. Returns true if the token is well-formed and not expired.
     */
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException ex) {
            log.warn("JWT expired: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            log.warn("Unsupported JWT: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            log.warn("Malformed JWT: {}", ex.getMessage());
        } catch (SecurityException ex) {
            log.warn("Invalid JWT signature: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.warn("JWT claims string is empty: {}", ex.getMessage());
        }
        return false;
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
