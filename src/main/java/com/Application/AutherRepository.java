package com.Application;

import org.springframework.data.repository.CrudRepository;

public interface AutherRepository extends CrudRepository<AutherEntity, String> {
    AutherEntity findByName(String name);
}
