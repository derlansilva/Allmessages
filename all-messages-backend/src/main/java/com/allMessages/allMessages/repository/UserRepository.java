package com.allMessages.allMessages.repository;

import com.allMessages.allMessages.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<String , User> {
}
