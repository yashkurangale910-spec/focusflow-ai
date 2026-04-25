package com.focusflow.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * Enables Spring Data MongoDB auditing so that @CreatedDate and
 * @LastModifiedDate annotations on domain entities are automatically populated.
 */
@Configuration
@EnableMongoAuditing
public class MongoAuditingConfig {
}
