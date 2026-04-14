package com.focusflow.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Intercepts every request, extracts the JWT from the Authorization header,
 * validates it, and sets the Spring SecurityContext so downstream controllers
 * can use @AuthenticationPrincipal or SecurityContextHolder.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = extractToken(request);

            if (token != null && tokenProvider.validateToken(token)) {
                String userId = tokenProvider.getUserIdFromToken(token);
                String email = tokenProvider.getEmailFromToken(token);
                String role = tokenProvider.getRoleFromToken(token);

                // Build authorities from the role claim
                String springRole = "ROLE_" + (role != null ? role.toUpperCase() : "USER");
                List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(springRole));

                // Store userId as principal so controllers can access it
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userId, email, authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            log.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Extract Bearer token from the Authorization header.
     */
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
