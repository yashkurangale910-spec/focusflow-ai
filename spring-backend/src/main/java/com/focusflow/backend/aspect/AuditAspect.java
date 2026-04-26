package com.focusflow.backend.aspect;

import com.focusflow.backend.annotation.AuditAction;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Aspect for logging audited actions and tracking execution performance.
 */
@Aspect
@Component
public class AuditAspect {

    private static final Logger auditLog = LoggerFactory.getLogger("AUDIT_LOGGER");

    @Around("@annotation(auditAction)")
    public Object logAudit(ProceedingJoinPoint joinPoint, AuditAction auditAction) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String actionDescription = auditAction.value().isEmpty() ? methodName : auditAction.value();
        String user = SecurityContextHolder.getContext().getAuthentication() != null 
                ? SecurityContextHolder.getContext().getAuthentication().getName() 
                : "anonymous";
        
        long startTime = System.currentTimeMillis();
        
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - startTime;
            
            auditLog.info("USER: [{}] | ACTION: [{}] | STATUS: SUCCESS | EXEC_TIME: {}ms", 
                    user, actionDescription, duration);
            
            return result;
        } catch (Throwable ex) {
            long duration = System.currentTimeMillis() - startTime;
            auditLog.error("USER: [{}] | ACTION: [{}] | STATUS: FAILED | ERROR: [{}] | EXEC_TIME: {}ms", 
                    user, actionDescription, ex.getMessage(), duration);
            throw ex;
        }
    }

    /**
     * Measure performance for all service methods.
     */
    @Around("execution(* com.focusflow.backend.service.*.*(..))")
    public Object profileExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - start;

        if (executionTime > 500) { // Log slow operations (>500ms)
            LoggerFactory.getLogger(joinPoint.getTarget().getClass())
                    .warn("⚠ SLOW OPERATION: {} executed in {}ms", joinPoint.getSignature(), executionTime);
        }
        
        return proceed;
    }
}
